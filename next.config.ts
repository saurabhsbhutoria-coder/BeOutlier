import type { NextConfig } from "next";
import { programs } from "./content/programs";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  /** Unpublished landing pages (Program.published false) send visitors to the houses on Home. Temporary, so they can come back. */
  async redirects() {
    return programs
      .filter((p) => !p.published)
      .map((p) => ({ source: p.route, destination: "/#houses", permanent: false }));
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
    ];
  },
};

export default nextConfig;
