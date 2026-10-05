/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // fully static HTML/CSS/JS -> works on the cheapest Hostinger hosting tier
  images: {
    loader: "custom",
    loaderFile: "./src/lib/cloudinaryLoader.ts",
  },
  trailingSlash: true,
};

export default nextConfig;
