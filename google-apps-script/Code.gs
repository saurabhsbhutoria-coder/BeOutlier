/**
 * BeOutlier lead pipeline: website form -> this script -> Google Sheet + emails.
 *
 * Setup (see SETUP.md, steps 1 to 3):
 *   1. Extensions > Apps Script in the Sheet, paste this file.
 *   2. Project Settings > Script Properties:
 *        SHARED_SECRET  the same long random value as APPS_SCRIPT_SECRET in Vercel
 *        TEAM_EMAIL     where lead alerts go (default team@beoutlier.in)
 *   3. Run setup() once from the editor and approve the permissions.
 *   4. Deploy > New deployment > Web app. Execute as: Me. Who has access: Anyone.
 *      Copy the URL into APPS_SCRIPT_URL in Vercel.
 */

var HEADERS = [
  'lead_id', 'submitted_at_ist', 'program', 'house', 'form_type',
  'student_name', 'grade', 'age', 'school', 'board', 'city', 'preferred_campus', 'friends',
  'parent_name', 'parent_whatsapp', 'parent_email', 'consent',
  'utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'fbclid',
  'page_url', 'referrer', 'status', 'notes'
];

var STATUSES = ['New', 'Test sent', 'Test done', 'Call done', 'Selected', 'Rejected', 'Enrolled', 'Paid'];

var SUMMER_PROGRAMS = ['Founders Fellowship', 'Robotics Residential', 'Design and Architecture Residential'];
var HACKATHON = 'Robotics Hackathon';
var HACKATHON_SEATS = 51;

var WHATSAPP_DISPLAY = '+91 88286 90027';
var WHATSAPP_LINK = 'https://wa.me/918828690027';

// ---------------------------------------------------------------- entry points

function doPost(e) {
  var body;
  try {
    body = JSON.parse(e.postData.contents);
  } catch (err) {
    return out_({ ok: false, error: 'bad_json' });
  }

  var props = PropertiesService.getScriptProperties();
  var secret = props.getProperty('SHARED_SECRET');
  if (!secret || !safeEqual_(String(body.secret || ''), secret)) {
    return out_({ ok: false, error: 'unauthorised' });
  }

  var lead = body.lead || {};
  if (!/^BO-\d{6}-[A-Z2-7]{6}$/.test(String(lead.lead_id || ''))) {
    return out_({ ok: false, error: 'bad_lead_id' });
  }

  var duplicate = false;
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(20000);
    var sheet = leadsSheet_();
    var found = sheet.getRange('A:A').createTextFinder(lead.lead_id).matchEntireCell(true).findNext();
    if (found) {
      duplicate = true; // a retry of a lead we already stored
    } else {
      var row = HEADERS.map(function (h) {
        if (h === 'status') return 'New';
        if (h === 'notes') return '';
        return clean_(lead[h]);
      });
      sheet.appendRow(row);
      SpreadsheetApp.flush();
    }
  } catch (err) {
    console.error('SHEET_ERROR', err, JSON.stringify(lead));
    return out_({ ok: false, error: 'sheet_error' });
  } finally {
    lock.releaseLock();
  }

  // Emails go out after the lock is released, so the Sheet is never held up by mail.
  if (!duplicate) {
    try { sendTeamEmail_(lead, props); } catch (err) { console.error('TEAM_EMAIL_FAILED', err); }
    try { sendParentEmail_(lead, props); } catch (err) { console.error('PARENT_EMAIL_FAILED', err); }
  }

  return out_({ ok: true, leadId: lead.lead_id, duplicate: duplicate });
}

function doGet() {
  return out_({ ok: true, service: 'beoutlier-leads' });
}

// ---------------------------------------------------------------- one time setup

/** Run once from the editor. Safe to run again. */
function setup() {
  var ss = SpreadsheetApp.getActive();
  var sheet = leadsSheet_();

  var statusCol = HEADERS.indexOf('status') + 1;
  var rule = SpreadsheetApp.newDataValidation().requireValueInList(STATUSES, true).setAllowInvalid(false).build();
  sheet.getRange(2, statusCol, sheet.getMaxRows() - 1, 1).setDataValidation(rule);
  sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold').setBackground('#25282A').setFontColor('#F7F4EF');
  sheet.setFrozenRows(1);

  var funnel = ss.getSheetByName('Funnel') || ss.insertSheet('Funnel');
  funnel.clear();
  funnel.clearConditionalFormatRules();

  var P = 'Leads!' + col_('program') + ':' + col_('program');
  var S = 'Leads!' + col_('status') + ':' + col_('status');

  var rows = [['Program', 'Applications', 'Offers', 'Enrolled', 'Offer rate', 'Within 15%']];
  SUMMER_PROGRAMS.forEach(function (name, i) {
    var r = i + 2;
    rows.push([
      name,
      '=COUNTIF(' + P + ',A' + r + ')',
      '=COUNTIFS(' + P + ',A' + r + ',' + S + ',"Selected")+COUNTIFS(' + P + ',A' + r + ',' + S + ',"Enrolled")',
      '=COUNTIFS(' + P + ',A' + r + ',' + S + ',"Enrolled")',
      '=IF(B' + r + '=0,0,C' + r + '/B' + r + ')',
      '=IF(B' + r + '=0,"",IF(E' + r + '<=0.15,"Yes","Over 15%"))'
    ]);
  });
  var t = SUMMER_PROGRAMS.length + 2;
  rows.push([
    'Summer 2027 total',
    '=SUM(B2:B' + (t - 1) + ')',
    '=SUM(C2:C' + (t - 1) + ')',
    '=SUM(D2:D' + (t - 1) + ')',
    '=IF(B' + t + '=0,0,C' + t + '/B' + t + ')',
    '=IF(B' + t + '=0,"",IF(E' + t + '<=0.15,"Yes","Over 15%"))'
  ]);
  funnel.getRange(1, 1, rows.length, 6).setValues(rows);
  funnel.getRange(2, 5, rows.length - 1, 1).setNumberFormat('0.0%');

  var h = rows.length + 2;
  var hack = [
    ['Hackathon (open to all)', 'Bookings', 'Paid', 'Seats', 'Seats left', ''],
    [HACKATHON, '=COUNTIF(' + P + ',A' + (h + 1) + ')', '=COUNTIFS(' + P + ',A' + (h + 1) + ',' + S + ',"Paid")', HACKATHON_SEATS, '=D' + (h + 1) + '-C' + (h + 1), '']
  ];
  funnel.getRange(h, 1, 2, 6).setValues(hack);

  funnel.getRange(1, 1, 1, 6).setFontWeight('bold').setBackground('#25282A').setFontColor('#F7F4EF');
  funnel.getRange(h, 1, 1, 6).setFontWeight('bold').setBackground('#25282A').setFontColor('#F7F4EF');
  funnel.getRange(t, 1, 1, 6).setFontWeight('bold');
  funnel.setColumnWidth(1, 300);

  var over = SpreadsheetApp.newConditionalFormatRule()
    .whenFormulaSatisfied('=$E2>0.15')
    .setBackground('#D9CBB8')
    .setRanges([funnel.getRange(2, 1, rows.length - 1, 6)])
    .build();
  funnel.setConditionalFormatRules([over]);
  funnel.setFrozenRows(1);
}

// ---------------------------------------------------------------- emails

function sendTeamEmail_(lead, props) {
  var to = props.getProperty('TEAM_EMAIL') || 'team@beoutlier.in';
  var digits = String(lead.parent_whatsapp || '').replace(/\D/g, '');
  var wa = 'https://wa.me/' + digits;

  var rows = HEADERS.filter(function (h) { return h !== 'status' && h !== 'notes'; }).map(function (h) {
    var v = lead[h] == null ? '' : String(lead[h]);
    return '<tr><th align="left" style="padding:6px 12px;border-bottom:1px solid #e5e4de;font:600 12px monospace;color:#62686B;text-transform:uppercase">' +
      esc_(h) + '</th><td style="padding:6px 12px;border-bottom:1px solid #e5e4de;font:14px Arial,sans-serif;color:#25282A">' + esc_(v) + '</td></tr>';
  }).join('');

  var html =
    '<div style="font-family:Arial,sans-serif;color:#25282A">' +
    '<p style="font-size:18px;font-weight:bold;margin:0 0 12px">' + esc_(lead.program) + ': ' + esc_(lead.student_name) + ', ' + esc_(lead.city) + '</p>' +
    '<p style="margin:0 0 16px"><a href="' + wa + '" style="display:inline-block;background:#6CD4B1;color:#25282A;font-weight:bold;padding:10px 16px;border-radius:8px;text-decoration:none;border:2px solid #25282A">WhatsApp ' +
    esc_(lead.parent_name) + ' on ' + esc_(lead.parent_whatsapp) + '</a></p>' +
    '<table cellspacing="0" style="border-collapse:collapse;border:1px solid #e5e4de">' + rows + '</table>' +
    '<p style="font-size:12px;color:#62686B;margin-top:16px">Move the status in the Leads tab as the application progresses.</p>' +
    '</div>';

  MailApp.sendEmail({
    to: to,
    subject: 'New lead: ' + lead.program + ' · ' + lead.student_name + ' · ' + lead.city,
    htmlBody: html,
    name: 'BeOutlier Leads',
    replyTo: lead.parent_email || to
  });
}

function sendParentEmail_(lead, props) {
  if (!lead.parent_email) return;
  var team = props.getProperty('TEAM_EMAIL') || 'team@beoutlier.in';
  var first = String(lead.student_name || '').split(' ')[0] || 'your child';
  var isBooking = lead.form_type === 'booking';
  var subject, lines;

  if (isBooking) {
    subject = first + "'s seat at the " + lead.program;
    lines = [
      'Hello ' + lead.parent_name + ',',
      first + "'s details for the " + lead.program + ' are in. 26 and 27 December, The Green Acres Academy, Chembur. 10 am to 7 pm, both days.',
      lead._payment_url
        ? 'The seat is held once the payment of ' + (lead._fee || 'the fee') + ' goes through. If you have not paid yet, use the button below.'
        : 'We will call you to confirm the booking and share the payment link.',
      'Booking reference: ' + lead.lead_id,
      'Questions? Reply to this email or WhatsApp us on ' + WHATSAPP_DISPLAY + '.'
    ];
  } else {
    subject = first + "'s application to the " + lead.program;
    lines = [
      'Hello ' + lead.parent_name + ',',
      first + "'s application to the " + lead.program + (lead.house ? ' (' + lead.house + ')' : '') + ' is in.',
      'What happens next. One: the aptitude test. The link reaches this email and your WhatsApp. Nothing to memorise. Two: a screening call. We want to hear how ' + first + ' thinks. Three: a letter. Selected or not.',
      '85 out of 100 applicants will not make it. Every application is read.',
      'Application reference: ' + lead.lead_id,
      'Questions? Reply to this email or WhatsApp us on ' + WHATSAPP_DISPLAY + '.'
    ];
  }

  var button = isBooking && lead._payment_url
    ? '<p style="margin:20px 0"><a href="' + esc_(lead._payment_url) + '" style="display:inline-block;background:#D9CBB8;color:#25282A;font-weight:bold;padding:12px 18px;border-radius:8px;text-decoration:none;border:2px solid #25282A">Pay ' + esc_(lead._fee || '') + ' and lock the seat</a></p>'
    : '';

  var html =
    '<div style="font-family:Arial,sans-serif;color:#25282A;max-width:560px">' +
    '<p style="font:bold 22px Impact,Arial Narrow,sans-serif;letter-spacing:0.5px;margin:0 0 20px">BE OUTLIER</p>' +
    lines.map(function (l) { return '<p style="font-size:15px;line-height:1.5;margin:0 0 14px">' + esc_(l) + '</p>'; }).join('') +
    button +
    '<p style="font-size:15px;margin:20px 0 0">BeOutlier<br><span style="color:#62686B">Think.Learn.Create</span></p>' +
    '</div>';

  MailApp.sendEmail({
    to: lead.parent_email,
    subject: subject,
    htmlBody: html,
    body: lines.join('\n\n') + (isBooking && lead._payment_url ? '\n\nPay here: ' + lead._payment_url : '') + '\n\nBeOutlier',
    name: 'BeOutlier',
    replyTo: team
  });
}

// ---------------------------------------------------------------- helpers

function leadsSheet_() {
  var ss = SpreadsheetApp.getActive();
  var sheet = ss.getSheetByName('Leads');
  if (!sheet) sheet = ss.insertSheet('Leads', 0);
  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

/** Text only. Anything that starts like a formula is stored as plain text. */
function clean_(v) {
  var s = v == null ? '' : String(v);
  if (s.length > 1000) s = s.slice(0, 1000);
  return /^[=+\-@\t\r]/.test(s) ? "'" + s : s;
}

function col_(name) {
  var n = HEADERS.indexOf(name) + 1;
  var s = '';
  while (n > 0) {
    var m = (n - 1) % 26;
    s = String.fromCharCode(65 + m) + s;
    n = Math.floor((n - 1) / 26);
  }
  return s;
}

function safeEqual_(a, b) {
  if (a.length !== b.length) return false;
  var r = 0;
  for (var i = 0; i < a.length; i++) r |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return r === 0;
}

function esc_(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function out_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
