import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: { path: string; priority: number }[] = [
    { path: "/", priority: 1 },
    { path: "/hackathon", priority: 0.9 },
    { path: "/founders", priority: 0.9 },
    { path: "/engineers", priority: 0.9 },
    { path: "/designers", priority: 0.9 },
    { path: "/apply", priority: 0.8 },
    { path: "/programs", priority: 0.7 },
    { path: "/the-code", priority: 0.5 },
    { path: "/faculty", priority: 0.5 },
    { path: "/parents", priority: 0.6 },
    { path: "/schools", priority: 0.5 },
    { path: "/privacy", priority: 0.2 },
    { path: "/terms", priority: 0.2 },
  ];
  const now = new Date();
  return routes.map((r) => ({ url: `${site.url}${r.path}`, lastModified: now, priority: r.priority }));
}
