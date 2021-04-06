import colors from 'vuetify/es5/util/colors'

export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: '%s - 퍼플타운',
    title: '즐거움이 가득한',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
      { rel: 'stylesheet', href: '/font/font.css'}
    ]
  },

  // Server setting(외부 공유)
  server: {
    'host': '0.0.0.0',
    'port': process.env.NODE_ENV === 'development' ? '4000' : '80'
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '@plugins/vuetify.js',
    '@plugins/axios.js',
    '@plugins/aws.js',
    '@plugins/mixins.js',
    '@plugins/uuid.js'
  ],

  /**
   * Router
   */
  router: {
    middleware: 'auth'
  },

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    // '@nuxtjs/vuetify',
    // '@nuxtjs/axios',
    // '@nuxtjs/proxy',
    // ['cookie-universal-nuxt', { alias: 'cookies' }],
    // '@nuxtjs/moment'
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    '@nuxtjs/vuetify',
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    ['cookie-universal-nuxt', { alias: 'cookies' }],
    '@nuxtjs/moment'
  ],

  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    treeShake : true, 
    defaultAssets : false,
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Nuxt Axios https://axios.nuxtjs.org/options
  // [임시(로컬)]
  axios: {
    proxy: true,
    proxyHeaders: true
  },

  /**
   * proxy module configuration
   * https://www.npmjs.com/package/@nuxtjs/proxy
   */
  proxy: {
    '/api-v1': {
      target: 'http://3.35.159.132:8080', 
      // target: 'http://192.168.0.2:8080', 
      pathRewrite: {'^/api-v1': ''}
    }
  },

  // https://ko.nuxtjs.org/guides/features/loading
  // loading: {
  //   color: '#7666D1',
  //   height: '1px'
  // },
  loading: false,

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
  }
}
