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
 * Engineers uses last summer's flea market photos as stand ins until
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
    src: "/media/designers/designers-house.jpg",
    alt: "Students working through a written task around a table, with a timer in the middle",
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

/**
 * Robotics Hackathon hero background (26 November 2026), full bleed like Home.
 * Desktop: the original 1280x568 loop. Phone: a 320x568 vertical slice from its centre.
 * Muted, no sound track.
 */
export const hackathonHero = {
  desktop: { mp4: "/media/hackathon/hero-desktop.mp4", poster: "/media/hackathon/hero-desktop.jpg" },
  mobile: { mp4: "/media/hackathon/hero-mobile.mp4", poster: "/media/hackathon/hero-mobile.jpg" },
};

/** Hero videos per landing page. Add an mp4 and a poster still, then set these. */
export const heroVideos: Partial<Record<"home" | "hackathon" | "founders" | "engineers" | "designers", { mp4: string; poster: string }>> = {};

/** The flea market video for Home section 02 and Founders. */
export const fleaMarketVideo: { mp4: string; poster: string } | null = null;

/** Student Reels for Home section 05 (vertical 9:16). */
export const reels: Reel[] = [];

/**
 * "Where it started": the flea market video in its own frame, shown at its
 * native 9:16 shape (never stretched or cropped), muted by default.
 * Its own file, separate from the small background copy used by the phone hero.
 * HD 720x1280 with sound, from the original (Desktop\Videos\Flea 2026.mp4,
 * 1080x1920), added 25 November 2026. hasAudio shows the sound button.
 */
export const storyVideo: { mp4: string; poster: string; width: number; height: number; hasAudio: boolean } = {
  mp4: "/media/home/flea-market-story-hd.mp4",
  poster: "/media/home/flea-market-story-hd.jpg",
  width: 720,
  height: 1280,
  hasAudio: true,
};

/**
 * Video slots for the two sliders. Leave src empty and the card shows a
 * visible placeholder. Vertical (9:16) clips, compressed under ~8 MB each,
 * with a poster still. name and line are shown under each video.
 */
export interface VideoSlot {
  src?: string;
  /**
   * Instagram reel code, the part after /reel/ in the link. With `src` it only
   * adds a "Watch on Instagram" link; without `src` the card falls back to
   * Instagram's own embed (4:5), which some browsers block.
   */
  instagram?: string;
  poster?: string;
  name?: string;
  line?: string;
}

/**
 * Home: the Outliers. Reels from @beoutlier.in, hosted on the site (23 November
 * 2026) because browsers with tracking protection block Instagram's embed.
 * `instagram` now only adds the "Watch on Instagram" link under each card.
 */
export const studentInterviews: VideoSlot[] = [
  { src: "/media/outliers/outlier-1.mp4", poster: "/media/outliers/outlier-1.jpg", instagram: "DY7PbgkzAEA" },
  { src: "/media/outliers/outlier-2.mp4", poster: "/media/outliers/outlier-2.jpg", instagram: "DNiEUMZzj4f" },
  { src: "/media/outliers/outlier-3.mp4", poster: "/media/outliers/outlier-3.jpg", instagram: "DORBB1piD6_" },
  { src: "/media/outliers/outlier-4.mp4", poster: "/media/outliers/outlier-4.jpg", instagram: "DXb8PRyk1_d" },
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

/**
 * Founders Fellowship page (rebuilt 27 November 2026). All BeOutlier footage:
 * hero from DesktopVideosFlea 2025.mp4 (letterbox bars cropped), phone hero
 * is the Home flea market loop, stills from Flea 2025 and Summer 2025.
 */
export const foundersHero = {
  desktop: { mp4: "/media/founders/hero-desktop.mp4", poster: "/media/founders/hero-desktop.jpg" },
  mobile: { mp4: "/media/home/hero-mobile.mp4", poster: "/media/home/hero-mobile-poster.jpg" },
};

export const foundersMedia = {
  /** Students bargaining with vendors in the wholesale market (reel, 26 November 2026), with sound */
  marketReel: { mp4: "/media/founders/market-reel.mp4", poster: "/media/founders/market-reel.jpg", width: 720, height: 1280, hasAudio: true },
  /** "13 yr old entrepreneurs building startups" reel (Instagram export), black ending trimmed, with sound */
  pitchReel: { mp4: "/media/founders/pitch-reel.mp4", poster: "/media/founders/pitch-reel.jpg", width: 720, height: 1280, hasAudio: true },
  mentor: { src: "/media/founders/summer-mentor.jpg", alt: "A mentor working through an idea with two students", width: 1600, height: 750 },
  team: { src: "/media/founders/summer-team.jpg", alt: "A team of students working through their brand together", width: 1600, height: 750 },
  session: { src: "/media/founders/summer-session.jpg", alt: "A student and a mentor at a session", width: 1600, height: 750 },
  flea: [
    { src: "/media/founders/flea-2025-3.jpg", alt: "Students selling their product to visitors at the flea market", width: 1600, height: 750 },
    { src: "/media/founders/flea-2025-7.jpg", alt: "Jars a team made, on their stall at the flea market", width: 1600, height: 750 },
    { src: "/media/founders/flea-2025-1.jpg", alt: "A student explaining her product to a visitor", width: 1600, height: 750 },
    { src: "/media/founders/flea-2025-13.jpg", alt: "Every team together at the flea market", width: 1600, height: 750 },
  ],
};
