module.exports = {
  content: [`./src/**/*.{jsx,tsx,stories.tsx,ts}`],
  // safelist: [
  //   {
  //     pattern:
  //       /(primary|secondary|accent|neutral|info|success|error|warning|btn|checkbox|toggle)/,
  //     variants: ["hover", "active", "focus", "checked"],
  //   },
  // ],

  plugins: [require("@tailwindcss/typography"), require("daisyui")],

  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/colors/themes")["[data-theme=light]"],

          primary: "#2f89fc",
          // primary: "#427a5b",

          secondary: "#086972",

          accent: "#f26d5b",
          "accent-content": "#ffffff",

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

          // error: "#E04138",
          // https://coolors.co/0d131c-f75063-3a0309-f52941
          // error: "#f52941",
          // "error-focus": "#f4152f",
          // "error-content": "#ffffff",
          // },
        },

        // dark: {
        //   // https://coolors.co/0d131c-60a5fa-011228-2584f8
        //   primary: "#60A5FA",
        //   "primary-focus": "#2584f8",
        //   "primary-content": "#011228",

        //   // https://coolors.co/0d131c-c084fc-290250-ad60fb
        //   secondary: "#c084fc",
        //   "secondary-focus": "#ad60fb",
        //   "secondary-content": "#290250",

        //   // https://coolors.co/0d131c-38bdf8-03384f-09a8ec
        //   accent: "#38bdf8",
        //   "accent-focus": "#09a8ec",
        //   "accent-content": "#03384f",

        //   // https://coolors.co/0d131c-3e4a61-586989-30394b
        //   neutral: "#3e4a61",
        //   "neutral-focus": "#30394b",
        //   "neutral-content": "#586989",

        //   // https://coolors.co/0d131c-131c2a-1a2639-e6eaef
        //   "base-100": "#1A2639",
        //   "base-200": "#131C2A",
        //   "base-300": "#0D131C",
        //   "base-content": "#E6EAEF",

        //   // https://coolors.co/0d131c-608de6-081735-2b67de
        //   info: "#608DE6",
        //   "info-focus": "#2B67DE",
        //   "info-content": "#081735",

        //   // https://coolors.co/0d131c-30d9c5-09342f-20ac9c
        //   success: "#30D9C5",
        //   "success-focus": "#20AC9C",
        //   "success-content": "#09342F",

        //   // https://coolors.co/0d131c-f3f169-4b4a06-d0cc11
        //   warning: "#f3f169",
        //   "warning-focus": "#D0CC11",
        //   "warning-content": "#4B4A06",

        //   // https://coolors.co/0d131c-f75063-3a0309-f52941
        //   error: "#F75063",
        //   "error-focus": "#F52941",
        //   "error-content": "#3A0309",
        // },
        // light: {
        //   // https://coolors.co/e0e0e0-2584f8-ffffff-1279f8
        //   primary: "#2584f8",
        //   "primary-focus": "#1279f8",
        //   "primary-content": "#ffffff",

        //   // https://coolors.co/0d131c-7a06ef-ffffff-7006db
        //   secondary: "#7a06ef",
        //   "secondary-focus": "#7006db",
        //   "secondary-content": "#ffffff",

        //   // https://coolors.co/0d131c-f47a01-ffffff-df7001
        //   accent: "#f47a01",
        //   "accent-focus": "#df7001",
        //   "accent-content": "#ffffff",

        //   // https://coolors.co/0d131c-b4becf-9ba9bf-8392af
        //   neutral: "#b4becf",
        //   "neutral-focus": "#8392af",
        //   "neutral-content": "#9ba9bf",

        //   // https://coolors.co/e0e0e0-f5f5f5-ffffff-050a10
        //   "base-100": "#E0E0E0",
        //   "base-200": "#f5f5f5",
        //   "base-300": "#ffffff",
        //   "base-content": "#050a10",

        //   // https://coolors.co/0d131c-2b67de-ffffff-215dd4
        //   info: "#2b67de",
        //   "info-focus": "#215dd4",
        //   "info-content": "#ffffff",

        //   // https://coolors.co/0d131c-20ac9c-ffffff-1c9b8c
        //   success: "#20ac9c",
        //   "success-focus": "#1c9b8c",
        //   "success-content": "#ffffff",

        //   // https://coolors.co/ffffff-f4f015-ffffff-d6d30a
        //   warning: "#9C9907",
        //   "warning-focus": "#d6d30a",
        //   "warning-content": "#ffffff",

        //   // https://coolors.co/0d131c-f52941-ffffff-f4152f
        //   error: "#f52941",
        //   "error-focus": "#f4152f",
        //   "error-content": "#ffffff",
        // },
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
