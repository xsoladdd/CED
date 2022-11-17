const plugin = require("tailwindcss/plugin");

/* eslint-disable global-require */
module.exports = {
  content: [`./src/**/*.{jsx,tsx,stories.tsx,ts}`],
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/colors/themes")["[data-theme=bumblebee]"],

          primary: "#263272",

          secondary: "#df93b9",

          accent: "#a3c3d0",

          neutral: "#22252F"

          // "base-100": "#fff",
          // "base-200": "#EBEBEB",
          // "base-300": "#DEDEDE",
          // "base-content": "#111827",

          // error: "#ef4444",
          // "error-content": "#ffffff",

          // info: "#3b82f6",
          // "info-content": "#ffffff",

          // success: "#10b981",
          // "success-content": "#ffffff",

          // warning: "#eab308",
          // "warning-content": "#ffffff",
        }
      }
      // "dark",
      // "light",
    ],
    styled: true,
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
    darkTheme: "business"
  },
  darkMode: `class` // or 'media'
  // theme: {
  //   colors: ({ colors }) => {
  //     return {
  //       ...colors,
  //       l: {
  //         base: "#fff",
  //         contrast: "#e5e7eb",
  //         text: "#111827",
  //       },
  //       d: {
  //         base: "#f0f0f0",
  //         contrast: "red",
  //       },
  //     };
  //   },
  // },
};
