import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

/** Brand share card: coral or navy ground, stacked headline. */
export function ogCard({ eyebrow, lines, dark = false }: { eyebrow: string; lines: string[]; dark?: boolean }) {
  const ground = dark ? "#1B1F4B" : "#F47171";
  const ink = dark ? "#FAFAF7" : "#1B1F4B";
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: ground,
          color: ink,
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 44,
            fontWeight: 900,
            color: "#FAFAF7",
            textShadow: dark ? "4px 4px 0 #F47171" : "4px 4px 0 #1B1F4B",
          }}
        >
          BE OUTLIER
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: 4, marginBottom: 20, color: dark ? "#5FD9B6" : ink }}>
            {eyebrow}
          </div>
          {lines.map((l) => (
            <div key={l} style={{ fontSize: 92, fontWeight: 900, lineHeight: 0.95, letterSpacing: -2 }}>
              {l}
            </div>
          ))}
        </div>
        <div style={{ display: "flex", fontSize: 28, fontWeight: 700 }}>beoutlier.in</div>
      </div>
    ),
    ogSize,
  );
}
