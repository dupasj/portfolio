// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  hooks: {
    // may be needed for successful bundling
    "webpack:config"(configs) {
      for(const config of configs){
        config.module!.rules!.push({
          test: /\.(glsl|vs|fs)$/,
          use: [
            {
              loader: 'url-loader',
            },
          ],
        })
      }
    }
  },

  prismic: {
    endpoint: 'https://dupas-portefolio.prismic.io/api/v2',


    /*
    apiOptions: {
      routes: [
        {
          type: 'project',
          path: '/project/:uid',
        }
      ],
      accessToken: process.env.PRISMIC_TOKEN
    },
    preview: true,
    previewReloadType: 'hard',
     */
  },

  i18n: {
    locales: [
      {
        code: 'en',
        language: 'en-US'
      },
      /*
      {
        code: 'fr',
        language: 'fr-FR'
      }
       */
    ],
    defaultLocale: 'en',
  },

  modules: [
    "@nuxtjs/prismic",
    '@nuxtjs/i18n',
    'nuxt-locomotive-scroll'
  ],
  devServer: {
    https: {
      key: 'localhost.key',
      cert: 'localhost.crt'
    }
  },
})