/**
 * Meta Pixel ID (BeOutlier's pixel, added 26 November 2026). Public by design:
 * it ships in every page's head. NEXT_PUBLIC_META_PIXEL_ID overrides it.
 */
export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim() || "1076234624682330";

/** Meta's base code, word for word, with the ID above. Placed in <head> by app/layout.tsx. */
export const metaPixelBaseCode = `!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${META_PIXEL_ID}');
fbq('track', 'PageView');`;
