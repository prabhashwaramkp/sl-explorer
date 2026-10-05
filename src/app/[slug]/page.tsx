import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import {
  getAllSlugs,
  getPostBySlug,
  getNearbyPosts,
  getRelatedByActivity,
} from "@/lib/content";
import Hero from "@/components/Hero";
import PhotoGallery from "@/components/PhotoGallery";
import RelatedGrid from "@/components/RelatedGrid";
import { LocationPill, ActivityPill } from "@/components/TagPill";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) return notFound();

  const nearby = getNearbyPosts(post);
  const related = getRelatedByActivity(post);

  return (
    <article>
      <Hero post={post} />

      <div className="mx-auto max-w-prose px-6 py-10">
        <div className="mb-6 flex flex-wrap gap-2">
          {post.location.map((loc) => (
            <LocationPill key={loc} label={loc} />
          ))}
          {post.activity.map((a) => (
            <ActivityPill key={a} label={a} />
          ))}
        </div>

        <div className="prose-content leading-relaxed [&_h2]:mt-8 [&_h2]:text-2xl [&_p]:mt-4">
          <MDXRemote source={post.content} />
        </div>

        <PhotoGallery images={post.gallery} />
      </div>

      <div className="mx-auto max-w-6xl px-6">
        <RelatedGrid title="Nearby to explore" posts={nearby} />
        <RelatedGrid title="You might also like" posts={related} />
      </div>
    </article>
  );
}
