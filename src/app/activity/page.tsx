import Link from "next/link";
import { getAllActivities } from "@/lib/content";

export default function ActivityIndex() {
  const activities = getAllActivities();
  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="mb-8 text-3xl">Browse by activity</h1>
      <div className="flex flex-wrap gap-3">
        {activities.map((a) => (
          <Link
            key={a}
            href={`/activity/${a}`}
            className="rounded-sm border border-fog px-4 py-2 capitalize no-underline hover:bg-fog/30"
          >
            {a.replace("-", " ")}
          </Link>
        ))}
      </div>
    </div>
  );
}
