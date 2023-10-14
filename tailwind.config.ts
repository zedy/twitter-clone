import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    minWidth: {
      '1/2': '50%',
    },
    extend: {},
  },
  plugins: [],
} satisfies Config;
