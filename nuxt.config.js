import * as path from "path";
import * as fs from "fs";

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'portefolio-v2',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'author', content: 'Jérémie Dupas' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/css/main.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/interaction.js', mode: 'client' },
    { src: '~/plugins/scroll.js', mode: 'client' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: false,

  i18n: {
    locales: [
      {
        code: 'en',
        iso: 'en-US'
      },
      {
        code: 'fr',
        iso: 'fr-FR'
      }
    ],
    defaultLocale: 'en',
    vueI18n: {
      fallbackLocale: 'en',
      messages: {
        en: require('./locale/en'),
        fr: require('./locale/fr'),
      }
    },
    parsePages: true,
  },
  prismic: {
    endpoint: 'https://dupas-portefolio.prismic.io/api/v2',
    modern: true,

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
  },

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/prismic',
    '@nuxt/postcss8',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    'nuxt-mail',
    '@nuxtjs/i18n',
  ],

  axios: {
    baseURL: process.env.BASE_URL,
  },

  // or use the top-level option:
  mail: {
    message: {
      to: 'dupasj97@gmail.com',
    },
    smtp: {
      service: 'gmail',
      auth: {
        user: "dupasj97@gmail.com",
        pass: process.env.EMAIL_PASSWORD
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [
      "three",
      "d3-ease"
    ],
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
    extend(config, ctx) {
      config.module.rules.push({
        test: /\.glsl$/,
        use: [
          {
            loader: 'raw-loader',
          },
          {
            loader: 'glslify-loader',
          },
        ],
      });
    },
  },
  server: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'localhost.key')),
      cert: fs.readFileSync(path.resolve(__dirname, 'localhost.crt'))
    },
    port: process.env.PORT || 3000,
    host: process.env.HOST || '0.0.0.0',
  }
}
