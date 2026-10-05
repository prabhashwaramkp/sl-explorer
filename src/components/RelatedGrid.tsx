import Link from "next/link";
import Image from "next/image";
import type { Post } from "@/lib/types";

export default function RelatedGrid({
  title,
  posts,
}: {
  title: string;
  posts: Post[];
}) {
  if (posts.length === 0) return null;

  return (
    <section className="my-12">
      <h2 className="mb-4 text-xl">{title}</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/${post.slug}`}
            className="group block no-underline"
          >
            <div className="relative mb-2 h-36 w-full overflow-hidden rounded-sm border border-fog">
              <Image
                src={post.heroImage}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(min-width: 1024px) 25vw, 50vw"
              />
            </div>
            <p className="font-display text-base text-forest">{post.title}</p>
            <p className="text-sm text-mist">{post.duration}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
