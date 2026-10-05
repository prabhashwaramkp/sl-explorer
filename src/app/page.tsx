import Link from "next/link";
import Image from "next/image";
import { Mountain, Droplets, Landmark, Flower2, PawPrint, Waves } from "lucide-react";
import { getAllPosts } from "@/lib/content";

const activityTiles = [
  { label: "Trekking", href: "/activity/trekking", icon: Mountain },
  { label: "Waterfalls", href: "/activity/waterfall", icon: Droplets },
  { label: "Wildlife", href: "/activity/wildlife", icon: PawPrint },
  { label: "Wellness", href: "/activity/wellness", icon: Flower2 },
  { label: "Heritage", href: "/activity/heritage", icon: Landmark },
  { label: "Coastal", href: "/activity/snorkeling", icon: Waves },
];

export default function HomePage() {
  const posts = getAllPosts();
  const featured = posts.filter((p) => p.type === "hub").slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <section className="relative flex min-h-[70vh] items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="home/hero"
            alt="Misty hill country ridgeline over tea terraces"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-forest/35 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
        </div>

        <div className="relative mx-auto w-full max-w-6xl px-6 pb-16">
          <h1 className="max-w-xl text-4xl text-paper sm:text-5xl">
            Find the Sri Lanka the guidebooks skip.
          </h1>
          <p className="mt-4 max-w-md text-paper/90">
            Trail-by-trail guides to trekking, waterfalls, wildlife, and
            wellness — written by people who&apos;ve actually walked the
            route.
          </p>
        </div>
      </section>

      {/* Explore by activity */}
      <section className="mx-auto max-w-6xl px-6 py-14">
        <h2 className="mb-6 text-2xl">Explore by activity</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {activityTiles.map(({ label, href, icon: Icon }) => (
            <Link
              key={label}
              href={href}
              className="flex flex-col items-center gap-2 rounded-sm border border-fog py-6 text-center no-underline hover:bg-fog/30"
            >
              <Icon className="text-forest" size={28} />
              <span className="text-sm text-ink">{label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <h2 className="mb-6 text-2xl">Start here: the Pekoe Trail</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {featured.map((post) => (
            <Link key={post.slug} href={`/${post.slug}`} className="block no-underline">
              <div className="relative mb-3 h-48 w-full overflow-hidden rounded-sm border border-fog">
                <Image
                  src={post.heroImage}
                  alt={post.title}
                  fill
                  className="object-cover"
                  sizes="(min-width: 640px) 33vw, 100vw"
                />
              </div>
              <p className="font-display text-lg text-forest">{post.title}</p>
              <p className="text-sm text-mist">{post.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
