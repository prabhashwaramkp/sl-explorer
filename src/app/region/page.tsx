import Link from "next/link";
import { getAllLocations } from "@/lib/content";

export default function RegionIndex() {
  const locations = getAllLocations();
  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="mb-8 text-3xl">Browse by region</h1>
      <div className="flex flex-wrap gap-3">
        {locations.map((loc) => (
          <Link
            key={loc}
            href={`/region/${loc.toLowerCase()}`}
            className="rounded-sm border border-fog px-4 py-2 no-underline hover:bg-fog/30"
          >
            {loc}
          </Link>
        ))}
      </div>
    </div>
  );
}
