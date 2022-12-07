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

          primary: "#022289",
          "primary-content": "white",

          secondary: "#ff82d3",

          accent: "#a3c3d0",

          neutral: "#22252F",

          // "base-100": "#fff",
          // "base-200": "#EBEBEB",
          // "base-300": "#DEDEDE",
          // "base-content": "#111827",

          error: "#f87171",
          "error-content": "black",
          // "error-content": "#ffffff"

          info: "#00d1ff",
          "info-content": "black",

          success: "#34d399",
          "success-content": "black",

          // warning: "#eab308",
          "warning-content": "black"
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
