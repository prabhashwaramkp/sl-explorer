import Image from "next/image";
import type { Post } from "@/lib/types";

export default function Hero({ post }: { post: Post }) {
  return (
    <div className="relative h-[50vh] min-h-[360px] w-full overflow-hidden">
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

      <div className="absolute bottom-0 left-0 right-0 mx-auto max-w-6xl px-6 pb-8">
        <h1 className="text-3xl text-paper sm:text-4xl">{post.title}</h1>
        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm text-paper/90">
          {post.location[0] && <span>{post.location[0]}</span>}
          {post.duration && <span>{post.duration}</span>}
          {post.difficulty && <span>{post.difficulty}</span>}
        </div>
      </div>
    </div>
  );
}
