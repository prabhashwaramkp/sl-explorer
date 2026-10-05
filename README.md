# SL Trails — Sri Lanka activity guide

## 1. First-time setup (on your own computer)

1. Install [Node.js](https://nodejs.org) (LTS version) if you don't have it.
2. Unzip this project, open a terminal in the folder, and run:
   ```
   npm install
   ```
3. Set up Cloudinary (free — this is where all your images live and get
   optimized/delivered from, see "Adding photos" below):
   - Sign up at [cloudinary.com](https://cloudinary.com) (free tier is
     generous for a site this size)
   - Copy your "Cloud name" from the dashboard
   - Copy `.env.local.example` to a new file named `.env.local`, and paste
     your cloud name in
4. Start the local dev server:
   ```
   npm run dev
   ```
   Visit `http://localhost:3000`. Note: search won't work yet in dev mode —
   see the Search section below.

## 2. Adding a new blog post (your main ongoing task)

Every guide is one `.mdx` file in the `/content` folder. To add a new one:

1. Copy an existing file in `/content` (e.g. `ravana-falls.mdx`) as a template.
2. Rename it to your new slug, e.g. `content/diyaluma-falls.mdx`.
3. Update the frontmatter (the `---` block at the top):
   - `slug` — must match the filename (no `.mdx`)
   - `title`, `excerpt`, `heroImage`
   - `gallery` — 2 to 10 photos with captions
   - `location` — this is what powers "Nearby to explore." Reuse existing
     location names exactly (e.g. `"Ella"`) so pages link together.
   - `activity` — powers "You might also like." Reuse existing tags where
     they apply (e.g. `"waterfall"`, `"trekking"`, `"wildlife"`).
   - `difficulty`, `duration`, `pillar`, `type` (`"hub"` or `"spoke"`)
4. Write the guide itself in Markdown below the frontmatter.
5. Save, then run `npm run build` to check it compiles with no errors.

That's the whole workflow — no CMS login, no database. Bring the new
`.mdx` file to me any time and I'll help you write or refine it.

## 3. Adding photos (via Cloudinary)

1. Log into your Cloudinary dashboard and upload photos into folders that
   match your content, e.g. upload Ella photos into a folder called `ella`.
2. When uploading, set the **public ID** to something clean and memorable
   (e.g. `stage-16-hero`, `gallery-1`) — Cloudinary lets you rename this
   at upload time.
3. In your `.mdx` frontmatter, reference the image as `"<folder>/<public-id>"`
   with **no file extension and no leading slash** — e.g. `"ella/stage-16-hero"`.
4. That's it. Cloudinary automatically resizes, compresses, and serves the
   right format (WebP/AVIF) per device — you don't need to manually
   compress anything before uploading.

## 4. Search (Pagefind)

Pagefind builds a search index from your final built site, so it only
works after a **production build**, not in `npm run dev`:

```
npm run build
```

This runs `next build` (outputs static files to `/out`) and then the
`postbuild` script runs Pagefind against that folder. To preview it
locally exactly as it'll work live:

```
npx serve out
```

## 5. Deploying to Hostinger

0. Make sure `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` is set wherever the build
   runs — either in a `.env.local` file alongside the project, or as an
   environment variable in Hostinger's build settings if you're using
   their Git auto-deploy. Without it, images won't resolve on the live site.
1. Run `npm run build` locally — this produces a static `/out` folder
   containing your entire site as plain HTML/CSS/JS.
2. In Hostinger's hPanel, use their Git integration (or file manager /
   FTP) to deploy the contents of `/out` to your hosting's public folder.
3. If you connect a GitHub repo to Hostinger for auto-deploy, set the
   build command to `npm run build` and the output/publish directory to `out`.

Because the whole site is static files, this works on Hostinger's
cheapest hosting tier — no Node.js server process needs to run
continuously.

## 6. Project structure reference

```
content/              <- every blog post lives here as .mdx
public/images/        <- your photos
src/app/              <- pages (homepage, [slug], activity/, region/)
src/components/       <- Hero, PhotoGallery, RelatedGrid, Nav, SearchBar
src/lib/content.ts    <- reads content/, powers tagging + related content
```
