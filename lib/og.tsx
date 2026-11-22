import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

let logoData: string | null = null;
function logo(): string {
  if (!logoData) {
    const png = readFileSync(join(process.cwd(), "public/brand/logo.png"));
    logoData = `data:image/png;base64,${png.toString("base64")}`;
  }
  return logoData;
}

/** Brand share card: mint ground, the real logo, mint label, stacked headline. */
export function ogCard({ eyebrow, lines }: { eyebrow: string; lines: string[]; dark?: boolean }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#6CD4B1",
          color: "#25282A",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logo()} width={330} height={74} alt="" />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 24, fontWeight: 600, letterSpacing: 5, marginBottom: 24, color: "#25282A" }}>
            {`● ${eyebrow}`}
          </div>
          {lines.map((l) => (
            <div key={l} style={{ fontSize: 88, fontWeight: 900, lineHeight: 0.95, letterSpacing: -1 }}>
              {l}
            </div>
          ))}
        </div>
        <div style={{ display: "flex", fontSize: 24, color: "#25282A" }}>beoutlier.in</div>
      </div>
    ),
    ogSize,
  );
}
