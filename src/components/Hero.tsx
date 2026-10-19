import Image from "next/image";
import type { Post } from "@/lib/types";

export default function Hero({ post }: { post: Post }) {
  return (
    <section className="relative h-[clamp(360px,55vh,720px)] w-full overflow-hidden">
      <Image
        src={post.heroImage}
        alt={post.title}
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      {/* Forest-green duotone tint, not a generic dark gradient */}
      <div className="absolute inset-0 bg-forest/30 mix-blend-multiply" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />

      <div className="absolute inset-x-0 bottom-0 mx-auto w-full max-w-6xl px-6 pb-8">
        <h1 className="max-w-4xl text-3xl text-paper sm:text-4xl lg:text-5xl">
          {post.title}
        </h1>
        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm text-paper/90">
          {post.location[0] && <span>{post.location[0]}</span>}
          {post.duration && <span>{post.duration}</span>}
          {post.difficulty && <span>{post.difficulty}</span>}
        </div>
      </div>
    </section>
  );
}
