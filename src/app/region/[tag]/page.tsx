import Link from "next/link";
import Image from "next/image";
import { getAllLocations, getPostsByLocation } from "@/lib/content";

export function generateStaticParams() {
  return getAllLocations().map((tag) => ({ tag: tag.toLowerCase() }));
}

export default function RegionPage({ params }: { params: { tag: string } }) {
  const posts = getPostsByLocation(params.tag);

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="mb-8 text-3xl capitalize">{params.tag}</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {posts.map((post) => (
          <Link key={post.slug} href={`/${post.slug}`} className="block no-underline">
            <div className="relative mb-3 h-44 w-full overflow-hidden rounded-sm border border-fog">
              <Image src={post.heroImage} alt={post.title} fill className="object-cover" sizes="33vw" />
            </div>
            <p className="font-display text-lg text-forest">{post.title}</p>
            <p className="text-sm text-mist">{post.activity.join(", ")}</p>
          </Link>
        ))}
        {posts.length === 0 && (
          <p className="text-mist">No guides for this region yet.</p>
        )}
      </div>
    </div>
  );
}
