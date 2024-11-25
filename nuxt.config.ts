export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  components: ["@/components"],
  compatibilityDate: "2024-10-22",

  app: {
    head: {
      title: '参考文献フォーマッタくん',
      htmlAttrs: { lang: 'ja' },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    },
  }
});
