/**
 * Real student photos and videos only. No stock.
 * Drop files into /public/media/<folder>/ and list them here.
 */
export interface Photo {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface Reel {
  src: string;
  poster: string;
  caption: string;
  /** Number overlaid on the video, e.g. "Sold out in 2 hours" */
  stat?: string;
}

export const fleaMarketPhotos: Photo[] = [
  {
    src: "/media/founders/flea-market-stall.jpg",
    alt: "Students explaining their product to customers at the flea market",
    width: 586,
    height: 645,
  },
  {
    src: "/media/founders/flea-market-juices.jpg",
    alt: "Three students selling bottled juices they made at their stall",
    width: 629,
    height: 645,
  },
  {
    src: "/media/founders/flea-market-jars.jpg",
    alt: "A student showing the jars her team made to a visitor",
    width: 579,
    height: 645,
  },
];

/**
 * Home hero background. Muted loop, text layered on top.
 * mobile: vertical (9:16). desktop: horizontal (16:9). Until a desktop video
 * is set, desktop keeps the coral layout with the photo collage.
 * Compress before adding: 480x854 (mobile) or 1280x720 (desktop), no audio, H.264, under ~6 MB.
 */
export const homeHero: {
  mobile?: { mp4: string; poster: string };
  desktop?: { mp4: string; poster: string };
} = {
  mobile: { mp4: "/media/home/hero-mobile.mp4", poster: "/media/home/hero-mobile-poster.jpg" },
};

/** Hero videos per landing page. Add an mp4 and a poster still, then set these. */
export const heroVideos: Partial<Record<"home" | "hackathon" | "founders" | "engineers" | "designers", { mp4: string; poster: string }>> = {};

/** The flea market video for Home section 02 and Founders. */
export const fleaMarketVideo: { mp4: string; poster: string } | null = null;

/** Student Reels for Home section 05 (vertical 9:16). */
export const reels: Reel[] = [];
