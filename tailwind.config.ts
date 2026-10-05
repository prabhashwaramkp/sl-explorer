import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        paper: "#EDEAE0",   // warm stone background
        ink: "#1E231F",     // deep green-black text
        forest: "#2F4A3C",  // primary brand green (nav, buttons)
        forestDark: "#20332A",
        clay: "#B9793E",    // accent - road/sunset ochre
        mist: "#7C8B85",    // muted secondary text
        fog: "#DAD9CD",     // hairline borders / dividers
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        body: ["var(--font-public-sans)", "sans-serif"],
      },
      maxWidth: {
        prose: "68ch",
      },
    },
  },
  plugins: [],
};

export default config;
