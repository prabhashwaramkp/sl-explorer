/**
 * Custom loader that routes every next/image request through Cloudinary
 * instead of Next's built-in optimizer (which needs a live server and
 * won't run on a static export).
 *
 * Store the Cloudinary "public ID" (no extension, no leading slash) as
 * the `src` in your content frontmatter, e.g. "ella/stage-16-hero"
 * for an image uploaded to the "ella" folder with public ID "stage-16-hero".
 */
type LoaderProps = {
  src: string;
  width: number;
  quality?: number;
};

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

export default function cloudinaryLoader({ src, width, quality }: LoaderProps) {
  if (!CLOUD_NAME) {
    throw new Error(
      "NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME is not set. Add it to .env.local (see README)."
    );
  }

  const params = [
    `w_${width}`,
    `q_${quality ?? "auto"}`,
    "f_auto", // auto-serves WebP/AVIF where supported
    "c_limit", // never upscale beyond the requested width
  ];

  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${params.join(",")}/${src}`;
}
