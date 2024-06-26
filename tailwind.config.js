/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ['Mona Sans'],
        script: ['Kaushan Script'],
        display: ['Mona Sans'],
        // body: ['Gilroy'],
        // script: ['Gilroy'],
        title: ['Gilroy'],
        // display: ['Gilroy'],
        fontOne: ['"Frunchy Sage"'],
        fontTwo: ['"Antic Didone"'],
        fontThree: ['Alta'],
        fontFour: ['Retropix'],
        fontFive: ['"One Little Font"'],
        fontSix: ['Tomorrow'],
        fontSeven: ['Charm'],
        fontEight: ['Denira Signature Demo'],
        logoFont: ['"Coco Gothic"']
      }
    },
  },
  plugins: [],
}

