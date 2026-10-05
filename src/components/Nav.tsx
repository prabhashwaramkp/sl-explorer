import Link from "next/link";
import SearchBar from "./SearchBar";

export default function Nav() {
  return (
    <header className="border-b border-fog bg-paper">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-4 px-6 py-4">
        <Link
          href="/"
          className="font-display text-2xl font-semibold text-forest no-underline"
        >
          SL Trails
        </Link>

        <div className="order-3 w-full sm:order-2 sm:flex-1 sm:max-w-md">
          <SearchBar />
        </div>

        <nav className="order-2 ml-auto flex gap-5 text-sm sm:order-3 sm:ml-0">
          <Link href="/activity" className="text-ink no-underline hover:underline">
            By activity
          </Link>
          <Link href="/region" className="text-ink no-underline hover:underline">
            By region
          </Link>
        </nav>
      </div>
    </header>
  );
}
