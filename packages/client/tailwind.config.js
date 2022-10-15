/* eslint-disable global-require */
module.exports = {
  content: [`./src/**/*.{jsx,tsx,stories.tsx,ts}`],
  plugins: [require("@tailwindcss/typography"), require("daisyui")],

  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/colors/themes")["[data-theme=light]"],

          primary: "#263272",

          secondary: "#df93b9",

          accent: "#a3c3d0",

          neutral: "#22252F",

          "base-100": "white",

          error: "#EC5F6B",
          "error-content": "#ffffff",

          info: "#227FF1",
          "info-content": "#ffffff",

          success: "#33cc54",
          "success-content": "#ffffff",

          warning: "#e0c45c",
          "warning-content": "#ffffff",
        },
      },
      // "dark",
      // "light",
    ],
    styled: true,
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
    darkTheme: "dark",
  },
  darkMode: `class`, // or 'media'
  theme: {},
};
