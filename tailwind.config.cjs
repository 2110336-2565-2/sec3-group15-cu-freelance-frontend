module.exports = {
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
    },

    screens: {
      dt: "600px",
      pf: "1400px",
    },

  },
};
