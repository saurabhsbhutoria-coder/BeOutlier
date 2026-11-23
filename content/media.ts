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
 * Photo behind each house panel (Home section 03 and /programs).
 * Engineers and Designers use 2025 flea market photos as stand ins until
 * real photos from those programs exist. Replace them as soon as possible,
 * ideally with photos at least 1600px wide.
 */
export const houseImages: Record<"founders" | "engineers" | "designers", { src: string; alt: string }> = {
  founders: {
    src: "/media/founders/flea-market-juices.jpg",
    alt: "Three students selling bottled juices they made at their stall",
  },
  engineers: {
    src: "/media/home/hero-mobile-poster.jpg",
    alt: "Students at a BeOutlier event",
  },
  designers: {
    src: "/media/founders/flea-market-stall.jpg",
    alt: "Students explaining their product to visitors at their stall",
  },
};

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

/** "Where it started": the same flea market video as the phone hero, in its own frame. */
export const storyVideo: { mp4: string; poster: string } = {
  mp4: "/media/home/hero-mobile.mp4",
  poster: "/media/home/hero-mobile-poster.jpg",
};

/**
 * Video slots for the two sliders. Leave src empty and the card shows a
 * visible placeholder. Vertical (9:16) clips, compressed under ~8 MB each,
 * with a poster still. name and line are shown under each video.
 */
export interface VideoSlot {
  src?: string;
  /**
   * Instagram reel code, the part after /reel/ in the link. Plays Instagram's
   * own embed inside the card (4:5, as Instagram crops reels in embeds).
   */
  instagram?: string;
  poster?: string;
  name?: string;
  line?: string;
}

/** Home: student interviews. Reels from @beoutlier.in, added 23 November 2026. */
export const studentInterviews: VideoSlot[] = [
  { instagram: "DY7PbgkzAEA" },
  { instagram: "DNiEUMZzj4f" },
  { instagram: "DORBB1piD6_" },
  { instagram: "DXb8PRyk1_d" },
];

/**
 * Home: parent testimonials, 7 videos (added 23 November 2026).
 * Cut from call recordings: each is cropped to the parent's own camera, so
 * no call interface, browser tabs or other participants' names show.
 * name and line are left empty until BeOutlier confirms how each family
 * wants to be credited.
 */
export const parentTestimonials: VideoSlot[] = [
  { src: "/media/parents/parent-take-ep1.mp4", poster: "/media/parents/parent-take-ep1.jpg" },
  { src: "/media/parents/parent-nishika.mp4", poster: "/media/parents/parent-nishika.jpg" },
  { src: "/media/parents/parent-hridaan.mp4", poster: "/media/parents/parent-hridaan.jpg" },
  { src: "/media/parents/parent-jitaksh.mp4", poster: "/media/parents/parent-jitaksh.jpg" },
  { src: "/media/parents/parent-prerna.mp4", poster: "/media/parents/parent-prerna.jpg" },
  { src: "/media/parents/parent-hastak.mp4", poster: "/media/parents/parent-hastak.jpg" },
  { src: "/media/parents/parent-jiana.mp4", poster: "/media/parents/parent-jiana.jpg" },
];
