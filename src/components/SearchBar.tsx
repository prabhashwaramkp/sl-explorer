"use client";

import { useEffect, useRef } from "react";
import { Search } from "lucide-react";

/**
 * Pagefind indexes your site AFTER `npm run build` (see the postbuild
 * script in package.json). It only works once you've built and served
 * the /out folder - it will not find results in `npm run dev`.
 *
 * This component loads Pagefind's prebuilt search UI at runtime and
 * mounts it into the div below. No server, no database, no monthly cost.
 */
export default function SearchBar() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadPagefind = async () => {
      try {
        // @ts-expect-error - pagefind-ui.js is generated at build time, not a real module
        await import(/* webpackIgnore: true */ "/pagefind/pagefind-ui.js");
        // @ts-expect-error - PagefindUI is attached to window by the script above
        if (window.PagefindUI && containerRef.current) {
          // @ts-expect-error see above
          new window.PagefindUI({
            element: containerRef.current,
            showSubResults: true,
            placeholder: "Search a place, activity, or trail…",
          });
        }
      } catch {
        // Expected during local dev before the first production build exists.
      }
    };
    loadPagefind();
  }, []);

  return (
    <div className="relative">
      <Search
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-mist"
        size={18}
        aria-hidden
      />
      <div ref={containerRef} className="pagefind-mount pl-2" />
    </div>
  );
}
