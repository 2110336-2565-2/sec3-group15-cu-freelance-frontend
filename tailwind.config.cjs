module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{html,js,jsx}",
    "./components/**/*.{html,js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        caveat: ["Caveat", "Brush Script MT"],
        ibm: ["Noto Sans Thai", "sans-serif"],
      },
      boxShadow: {
        button: "0px 2px 10px rgba(0, 0, 0, 0.1)",
        buttonHover: "0px 2px 10px rgba(0, 0, 0, 0.5)",
        navbar: "0px 2px 20px rgba(0, 0, 0, 0.25)",
        dropnav:
          "0 20px 25px -5px rgb(0 0 0 / 0.25), 0 8px 10px -6px rgb(0 0 0 / 0.25);",
      },
      colors: {
        freelance: {
          pink: "#D62B70",
          "black-primary": "#151515",
          "black-secondary": "#707070",
          white: "#000000",
          "landing-purple": "#4F044C",
        },
        "cufl-pink": {
          50: "#f7d5e2",
          100: "#efaac6",
          200: "#e680a9",
          300: "#de558d",
          400: "#D62B70",
          500: "#ab225a",
          600: "#801a43",
        },
      },
      fontSize: {
        "mobile-small": "0.75rem", // 12px
        "mobile-body": "0.875rem", // 14px
        "mobile-h2": "1rem", // 16px
        "mobile-h1": "1.25rem", // 20px

        "desktop-base": "1rem", // 16px
        "desktop-h2": "1.25rem", // 24px
        "desktop-h1": "1.5rem", // 24px
      },
    },

    screens: {
      tbl: "550px",
      sws: "723px",
      dt: "850px",
      swm: "980px",
      landing: "1000px",
      wd: "1250px",
      swl: "1350px",
      pf: "1400px",
    },
  },
};
