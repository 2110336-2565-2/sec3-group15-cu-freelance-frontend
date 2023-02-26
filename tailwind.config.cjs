module.exports = {
  content: [
    "./index.html", "./src/**/*.{js,ts,jsx,tsx}",
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
        'button' :'0px 2px 10px rgba(0, 0, 0, 0.1)',
        'buttonHover' :'0px 2px 10px rgba(0, 0, 0, 0.5)',
        'navbar': '0px 2px 20px rgba(0, 0, 0, 0.25)',
        'dropnav':'0 20px 25px -5px rgb(0 0 0 / 0.25), 0 8px 10px -6px rgb(0 0 0 / 0.25);',
      },
      colors:{
        'freelance': {
          'pink': '#D62B70',
          'black-primary' : '#151515',
          'black-secondary': '#707070',
          'white': '#000000'
        }
      },
      fontSize : {
        'mobile-small': '0.75rem', // 12px
        'mobile-body': '0.875rem', // 14px
        'mobile-h3': '1rem',    // 16px
        'mobile-h1': '1.25rem'    // 20px
      }
    },

    screens: {
      dt: "600px",
      pf: "1400px",
    },

  },
};
