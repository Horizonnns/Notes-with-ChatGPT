// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	css: ['~/assets/css/main.css'],

	components: {
		global: true,
		dirs: [
			{
				path: '~/components',
				pathPrefix: false,
			},
			// {
			// 	path: '~/assets/img',
			// 	pathPrefix: false,
			// },
		],
	},

	// runtimeConfig: {
	// 	public: {
	// 		backendUrl: process.env.BASE_URL,
	// 	},
	// },

	postcss: {
		plugins: {
			tailwindcss: {},
			autoprefixer: {},
		},
	},
});
