/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    './app.vue',
  ],
  theme: {
    container: {
      center: true,

      screens: {
        lg: '1220px',
        md: '1024px',
        sm: '768px',
      },
    },

    extend: {
      // colors: {
      // 	primary: '#00b956',
      // 	secondary: '#731982',
      // 	gray: {
      // 		10: '#999',
      // 		11: '#faf9f9',
      // 	},
      // },
      fontFamily: {
        DancingScript: 'DancingScript',
      },
    },
  },
  plugins: [],
};
