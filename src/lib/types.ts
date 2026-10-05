export type GalleryImage = {
  src: string;
  caption?: string;
};

export type PostMeta = {
  slug: string;
  title: string;
  excerpt: string;
  heroImage: string;
  gallery: GalleryImage[];
  location: string[];   // e.g. ["Ella", "Hill Country"] -> powers "Nearby to explore"
  activity: string[];   // e.g. ["trekking", "waterfall"] -> powers "You might also like"
  difficulty?: string;
  duration?: string;
  pillar: string;       // e.g. "Pekoe Trail", "Wildlife", "Wellness & Ayurveda"
  type: "hub" | "spoke";
};

export type Post = PostMeta & {
  content: string; // raw MDX body
};
