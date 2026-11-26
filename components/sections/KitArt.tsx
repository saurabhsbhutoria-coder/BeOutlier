/**
 * Line illustrations of the hackathon kit parts, drawn for the site so they
 * stay sharp, light and on brand. Swap any one for a real photo by setting
 * `photo` on the item in content/hackathonKit.ts.
 */
import type { ReactNode } from "react";

const INK = "#25282A";
const MINT = "#6CD4B1";
const DEEP = "#2A7D62";
const SAND = "#D9CBB8";
const METAL = "#C3C8CC";
const PAPER = "#FFFFFF";

export type KitArtName =
  | "esp32"
  | "imu"
  | "mic"
  | "qwiic"
  | "glove"
  | "driver"
  | "motor"
  | "wheels"
  | "cells"
  | "holder"
  | "hardware"
  | "powerbank"
  | "usb"
  | "breadboard"
  | "jumpers"
  | "leds"
  | "car"
  | "wifi";

const line = { stroke: INK, strokeWidth: 2.5, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };

/** A row of header pins or holes */
function Pins({ x, y, n, step = 8, vertical = false, r = 1.9 }: { x: number; y: number; n: number; step?: number; vertical?: boolean; r?: number }) {
  return (
    <>
      {Array.from({ length: n }, (_, i) => (
        <circle key={i} cx={vertical ? x : x + i * step} cy={vertical ? y + i * step : y} r={r} fill={INK} />
      ))}
    </>
  );
}

const art: Record<KitArtName, ReactNode> = {
  esp32: (
    <>
      <rect x="18" y="28" width="118" height="64" rx="6" fill={MINT} {...line} />
      <rect x="132" y="51" width="16" height="18" rx="2" fill={METAL} {...line} />
      <rect x="26" y="38" width="66" height="44" rx="3" fill={PAPER} {...line} />
      <path d="M31 44h7v8h-7v8h7v8h-7v8h7" fill="none" stroke={DEEP} strokeWidth="2.5" strokeLinejoin="round" />
      <rect x="46" y="42" width="40" height="36" rx="2" fill={METAL} {...line} />
      <rect x="104" y="40" width="10" height="8" rx="1.5" fill={INK} />
      <rect x="104" y="72" width="10" height="8" rx="1.5" fill={INK} />
      <Pins x={26} y={33} n={14} />
      <Pins x={26} y={87} n={14} />
    </>
  ),
  imu: (
    <>
      <rect x="44" y="28" width="72" height="64" rx="7" fill={MINT} {...line} />
      <rect x="34" y="49" width="14" height="22" rx="2" fill={PAPER} {...line} />
      <rect x="112" y="49" width="14" height="22" rx="2" fill={PAPER} {...line} />
      <rect x="69" y="49" width="22" height="22" rx="2.5" fill={INK} />
      <circle cx="80" cy="60" r="2.2" fill={MINT} />
      <circle cx="53" cy="37" r="3.5" fill={PAPER} {...line} />
      <circle cx="107" cy="37" r="3.5" fill={PAPER} {...line} />
      <circle cx="53" cy="83" r="3.5" fill={PAPER} {...line} />
      <circle cx="107" cy="83" r="3.5" fill={PAPER} {...line} />
      <path d="M80 18v6M80 96v6M24 60h6M130 60h6" stroke={DEEP} strokeWidth="2.5" strokeLinecap="round" />
    </>
  ),
  mic: (
    <>
      <rect x="36" y="32" width="88" height="56" rx="7" fill={MINT} {...line} />
      <rect x="54" y="45" width="30" height="30" rx="4" fill={METAL} {...line} />
      <circle cx="69" cy="60" r="5" fill={INK} />
      <Pins x={110} y={42} n={6} step={7} vertical r={2.1} />
      <path d="M22 50c-4 6-4 14 0 20M14 44c-7 10-7 22 0 32" fill="none" stroke={DEEP} strokeWidth="2.5" strokeLinecap="round" />
    </>
  ),
  qwiic: (
    <>
      {[
        { y: 50, c: INK, end: 28 },
        { y: 56, c: MINT, end: 50 },
        { y: 62, c: DEEP, end: 72 },
        { y: 68, c: "#B39C80", end: 94 },
      ].map((w) => (
        <g key={w.y}>
          <path d={`M38 ${w.y}C78 ${w.y} 86 ${w.end} 124 ${w.end}`} fill="none" stroke={w.c} strokeWidth="5" strokeLinecap="round" />
          <rect x="122" y={w.end - 4} width="12" height="8" rx="1.5" fill={INK} />
          <path d={`M134 ${w.end}h10`} stroke={METAL} strokeWidth="3" strokeLinecap="round" />
        </g>
      ))}
      <rect x="18" y="44" width="22" height="30" rx="3" fill={PAPER} {...line} />
      <path d="M24 52v14M30 52v14" stroke={INK} strokeWidth="2" />
    </>
  ),
  glove: (
    <>
      <rect x="47" y="24" width="13" height="46" rx="6.5" fill={SAND} {...line} />
      <rect x="62" y="14" width="13" height="54" rx="6.5" fill={SAND} {...line} />
      <rect x="77" y="16" width="13" height="52" rx="6.5" fill={SAND} {...line} />
      <rect x="92" y="26" width="13" height="44" rx="6.5" fill={SAND} {...line} />
      <rect x="104" y="54" width="13" height="34" rx="6.5" fill={SAND} transform="rotate(-38 110 71)" {...line} />
      <path d="M45 60h62v26c0 10-8 18-18 18H63c-10 0-18-8-18-18z" fill={SAND} {...line} />
      <rect x="61" y="62" width="32" height="20" rx="2.5" fill={MINT} {...line} />
      <circle cx="69" cy="72" r="3" fill={INK} />
      <rect x="44" y="90" width="64" height="11" rx="2" fill={INK} />
    </>
  ),
  driver: (
    <>
      <rect x="28" y="32" width="104" height="56" rx="7" fill={MINT} {...line} />
      <rect x="62" y="47" width="36" height="26" rx="2.5" fill={INK} />
      <path d="M66 47v-4M74 47v-4M82 47v-4M90 47v-4M66 73v4M74 73v4M82 73v4M90 73v4" stroke={INK} strokeWidth="2" />
      <Pins x={38} y={38} n={11} step={8.5} />
      <Pins x={38} y={82} n={11} step={8.5} />
    </>
  ),
  motor: (
    <>
      <rect x="56" y="20" width="10" height="22" rx="2" fill={PAPER} {...line} />
      <rect x="26" y="38" width="72" height="46" rx="5" fill="#E9C46A" {...line} />
      <circle cx="38" cy="50" r="3.5" fill={PAPER} {...line} />
      <circle cx="86" cy="72" r="3.5" fill={PAPER} {...line} />
      <rect x="96" y="44" width="40" height="34" rx="10" fill={METAL} {...line} />
      <rect x="136" y="52" width="7" height="6" rx="1" fill={INK} />
      <rect x="136" y="64" width="7" height="6" rx="1" fill={INK} />
      <path d="M143 55c8 0 8 12 0 12" fill="none" stroke={DEEP} strokeWidth="2.5" />
    </>
  ),
  wheels: (
    <>
      <circle cx="62" cy="60" r="36" fill={INK} />
      <circle cx="62" cy="60" r="18" fill={SAND} {...line} />
      <circle cx="62" cy="60" r="4.5" fill={INK} />
      {[0, 60, 120, 180, 240, 300].map((a) => (
        <circle key={a} cx={62 + 28 * Math.cos((a * Math.PI) / 180)} cy={60 + 28 * Math.sin((a * Math.PI) / 180)} r="2.2" fill="#4A4E51" />
      ))}
      <rect x="110" y="58" width="28" height="10" rx="2" fill={METAL} {...line} />
      <path d="M116 68v6M132 68v6" stroke={INK} strokeWidth="2.5" />
      <circle cx="124" cy="82" r="9" fill={METAL} {...line} />
    </>
  ),
  cells: (
    <>
      {[0, 1, 2, 3].map((i) => {
        const x = 34 + i * 24;
        return (
          <g key={i}>
            <rect x={x + 6} y="26" width="6" height="6" rx="1" fill={METAL} {...line} />
            <rect x={x} y="31" width="18" height="62" rx="4" fill={MINT} {...line} />
            <rect x={x} y="74" width="18" height="19" rx="0" fill={DEEP} />
            <rect x={x} y="31" width="18" height="62" rx="4" fill="none" {...line} />
          </g>
        );
      })}
    </>
  ),
  holder: (
    <>
      <path d="M24 44C12 44 12 28 4 26" fill="none" stroke={MINT} strokeWidth="3.5" strokeLinecap="round" />
      <path d="M24 52C8 52 8 36 2 36" fill="none" stroke={DEEP} strokeWidth="3.5" strokeLinecap="round" />
      <rect x="22" y="30" width="118" height="60" rx="5" fill={INK} />
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x="30" y={37 + i * 12} width="94" height="9" rx="4.5" fill="#3E4245" />
      ))}
      <rect x="128" y="52" width="8" height="16" rx="2" fill={MINT} />
      <rect x="129.5" y="54" width="5" height="6" rx="1" fill={INK} />
    </>
  ),
  hardware: (
    <>
      <rect x="18" y="44" width="72" height="10" rx="1.5" fill={INK} />
      {Array.from({ length: 7 }, (_, i) => (
        <path key={i} d={`M${24 + i * 10} 30v36`} stroke={METAL} strokeWidth="3" strokeLinecap="round" />
      ))}
      <circle cx="116" cy="38" r="11" fill={METAL} {...line} />
      <path d="M110 38h12" stroke={INK} strokeWidth="2.5" strokeLinecap="round" />
      <rect x="113" y="49" width="6" height="20" fill={METAL} {...line} />
      <path d="M136 78l7 4v8l-7 4-7-4v-8z" fill={METAL} {...line} />
      <circle cx="136" cy="86" r="2.8" fill={PAPER} {...line} />
      <path d="M18 88C40 76 60 100 92 86" fill="none" stroke={MINT} strokeWidth="4" strokeLinecap="round" />
      <path d="M18 98C40 86 62 110 96 96" fill="none" stroke={INK} strokeWidth="4" strokeLinecap="round" />
    </>
  ),
  powerbank: (
    <>
      <rect x="32" y="26" width="92" height="68" rx="13" fill={PAPER} {...line} />
      <rect x="122" y="50" width="8" height="20" rx="1.5" fill={INK} />
      <path d="M84 38L68 62h13l-6 20 20-27H82l6-17z" fill={MINT} {...line} />
      {[0, 1, 2, 3].map((i) => (
        <circle key={i} cx={46 + i * 7} cy="84" r="2.3" fill={i < 3 ? MINT : SAND} />
      ))}
    </>
  ),
  usb: (
    <>
      <path d="M58 58C86 58 76 22 98 26c24 5-6 62 18 64" fill="none" stroke={INK} strokeWidth="5" strokeLinecap="round" />
      <rect x="14" y="50" width="26" height="16" rx="1.5" fill={METAL} {...line} />
      <rect x="20" y="55" width="5" height="4" fill={INK} />
      <rect x="40" y="47" width="20" height="22" rx="3" fill={INK} />
      <rect x="112" y="82" width="18" height="16" rx="3" fill={INK} />
      <rect x="130" y="85" width="10" height="10" rx="1.5" fill={METAL} {...line} />
    </>
  ),
  breadboard: (
    <>
      <rect x="18" y="28" width="124" height="64" rx="4" fill={PAPER} {...line} />
      <rect x="20" y="57" width="120" height="6" fill="#E7E1D6" />
      {[36, 43, 50, 70, 77, 84].map((y) =>
        Array.from({ length: 17 }, (_, i) => (
          <rect key={`${y}-${i}`} x={27 + i * 6.4} y={y - 1.4} width="2.8" height="2.8" rx="0.5" fill={INK} opacity="0.75" />
        )),
      )}
      <path d="M45 43C55 22 75 22 85 43" fill="none" stroke={MINT} strokeWidth="3.5" strokeLinecap="round" />
    </>
  ),
  jumpers: (
    <>
      {[
        { y1: 34, y2: 46, c: MINT },
        { y1: 58, y2: 62, c: INK },
        { y1: 84, y2: 78, c: DEEP },
      ].map((w, i) => (
        <g key={i}>
          <path d={`M32 ${w.y1}C70 ${w.y1 - 18} 92 ${w.y2 + 18} 128 ${w.y2}`} fill="none" stroke={w.c} strokeWidth="5" strokeLinecap="round" />
          <rect x="20" y={w.y1 - 4} width="14" height="8" rx="1.5" fill={INK} />
          {i === 2 ? null : <path d={`M12 ${w.y1}h8`} stroke={METAL} strokeWidth="3" strokeLinecap="round" />}
          <rect x="126" y={w.y2 - 4} width="14" height="8" rx="1.5" fill={INK} />
          {i === 0 ? null : <path d={`M140 ${w.y2}h8`} stroke={METAL} strokeWidth="3" strokeLinecap="round" />}
        </g>
      ))}
    </>
  ),
  leds: (
    <>
      {[
        { x: 26, fill: MINT },
        { x: 58, fill: PAPER },
      ].map((l) => (
        <g key={l.x}>
          <path d={`M${l.x + 9} 70v30M${l.x + 19} 70v24`} stroke={METAL} strokeWidth="3" strokeLinecap="round" />
          <path d={`M${l.x + 2} 66V44a12 12 0 0 1 24 0v22z`} fill={l.fill} {...line} />
          <rect x={l.x - 1} y="64" width="30" height="7" rx="1.5" fill={l.fill} {...line} />
        </g>
      ))}
      <path d="M92 60h10M134 60h12" stroke={METAL} strokeWidth="3" strokeLinecap="round" />
      <rect x="100" y="52" width="36" height="16" rx="8" fill={SAND} {...line} />
      <rect x="108" y="52" width="3.5" height="16" fill={DEEP} />
      <rect x="115" y="52" width="3.5" height="16" fill={INK} />
      <rect x="122" y="52" width="3.5" height="16" fill={DEEP} />
    </>
  ),
  car: (
    <>
      <rect x="26" y="52" width="108" height="26" rx="7" fill={SAND} {...line} />
      <rect x="50" y="38" width="46" height="14" rx="2" fill={MINT} {...line} />
      <Pins x={56} y={45} n={5} step={8} r={1.6} />
      <rect x="102" y="41" width="24" height="11" rx="2" fill={INK} />
      <circle cx="48" cy="84" r="17" fill={INK} />
      <circle cx="48" cy="84" r="6" fill={SAND} {...line} />
      <circle cx="112" cy="84" r="17" fill={INK} />
      <circle cx="112" cy="84" r="6" fill={SAND} {...line} />
    </>
  ),
  wifi: (
    <>
      <path d="M50 58a42 42 0 0 1 60 0M60 70a28 28 0 0 1 40 0M70 82a14 14 0 0 1 20 0" fill="none" stroke={DEEP} strokeWidth="5" strokeLinecap="round" />
      <circle cx="80" cy="92" r="4.5" fill={DEEP} />
    </>
  ),
};

export function KitArt({ name, label, className = "" }: { name: KitArtName; label: string; className?: string }) {
  return (
    <svg viewBox="0 0 160 120" role="img" aria-label={label} className={className}>
      {art[name]}
    </svg>
  );
}
