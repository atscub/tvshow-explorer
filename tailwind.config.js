/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      aspectRatio: {
        "video-thumb": "1.5",
      },
      fontSize: {
        "title-15": ["15px", { lineHeight: "18px", fontWeight: "bold" }],
        "body-13": ["13px", { lineHeight: "15px", fontWeight: "normal" }],
      },
    },
  },
  plugins: [],
};
