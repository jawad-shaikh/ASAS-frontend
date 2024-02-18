import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#EF6724',
        black : '#01010D',
        green: '#31AF72',
        'light-gray': '#F7F6FF',
        border: '#DFE1E6'
      }
    },
  },
  plugins: [],
};
export default config;
