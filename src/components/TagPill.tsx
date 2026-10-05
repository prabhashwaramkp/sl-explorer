import Link from "next/link";
import { MapPin, Compass } from "lucide-react";

export function LocationPill({ label }: { label: string }) {
  return (
    <Link
      href={`/region/${encodeURIComponent(label.toLowerCase())}`}
      className="inline-flex items-center gap-1 rounded-full border border-fog bg-transparent px-3 py-1 text-sm text-forest no-underline hover:bg-fog/40"
    >
      <MapPin size={14} /> {label}
    </Link>
  );
}

export function ActivityPill({ label }: { label: string }) {
  return (
    <Link
      href={`/activity/${encodeURIComponent(label.toLowerCase())}`}
      className="inline-flex items-center gap-1 rounded-full border border-fog bg-transparent px-3 py-1 text-sm text-forest no-underline hover:bg-fog/40"
    >
      <Compass size={14} /> {label}
    </Link>
  );
}
