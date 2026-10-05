import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Post, PostMeta } from "./types";

const CONTENT_DIR = path.join(process.cwd(), "content");

/** Reads every .mdx file in /content and parses its frontmatter + body. */
export function getAllPosts(): Post[] {
  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".mdx"));

  const posts = files.map((filename) => {
    const raw = fs.readFileSync(path.join(CONTENT_DIR, filename), "utf8");
    const { data, content } = matter(raw);
    return {
      ...(data as PostMeta),
      content,
    };
  });

  return posts;
}

export function getPostBySlug(slug: string): Post | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}

export function getAllSlugs(): string[] {
  return getAllPosts().map((p) => p.slug);
}

/**
 * "Nearby to explore" - other posts sharing at least one location tag.
 * This is what lets a Pekoe Trail stage page auto-surface nearby
 * waterfalls/villages without anyone manually linking them.
 */
export function getNearbyPosts(post: Post, limit = 4): Post[] {
  const all = getAllPosts().filter((p) => p.slug !== post.slug);
  return all
    .filter((p) => p.location.some((loc) => post.location.includes(loc)))
    .slice(0, limit);
}

/**
 * "You might also like" - other posts sharing an activity type,
 * regardless of location. Surfaces cross-pillar connections
 * (e.g. a trekking post suggesting another trekking post elsewhere).
 */
export function getRelatedByActivity(post: Post, limit = 4): Post[] {
  const all = getAllPosts().filter((p) => p.slug !== post.slug);
  return all
    .filter((p) => p.activity.some((a) => post.activity.includes(a)))
    .slice(0, limit);
}

export function getPostsByActivity(activity: string): Post[] {
  return getAllPosts().filter((p) =>
    p.activity.map((a) => a.toLowerCase()).includes(activity.toLowerCase())
  );
}

export function getPostsByLocation(location: string): Post[] {
  return getAllPosts().filter((p) =>
    p.location.map((l) => l.toLowerCase()).includes(location.toLowerCase())
  );
}

export function getAllActivities(): string[] {
  const set = new Set<string>();
  getAllPosts().forEach((p) => p.activity.forEach((a) => set.add(a)));
  return Array.from(set);
}

export function getAllLocations(): string[] {
  const set = new Set<string>();
  getAllPosts().forEach((p) => p.location.forEach((l) => set.add(l)));
  return Array.from(set);
}
