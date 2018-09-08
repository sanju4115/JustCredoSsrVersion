const pkg = require("./package");

const nodeExternals = require("webpack-node-externals");

module.exports = {
  mode: "universal",

  /*
  ** Headers of the page
  */
  head: {
    title: "JustCredo - Educational Networking",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { 
        hid: "description", 
        name: "description", 
        content: "Search educational places(school, coaching,"+
                 "music class, sports class, art class) here, create educational "+
                "place profile here. Read reviews and blogs of educational places." 
      },
      { hid: 'keywords', name: 'keywords', 
        content: 'schools, coachings, sports, music, tutors, class, education, ratings, reviews' 
      }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/ic_launcher_rect.png" },
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons"
      }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: "#FFFFFF" },

  /*
  ** Global CSS
  */
  css: ["vuetify/src/stylus/main.styl"],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    "@/plugins/vuetify",
    "@/plugins/fireauth",
    "@/plugins/location",
    { src: "@/plugins/localStorage.js", ssr: false }
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    "@nuxtjs/axios",
    'cookie-universal-nuxt' //for cookie storage
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      if (ctx.isServer) {
        config.externals = [
          nodeExternals({
            whitelist: [/^vuetify/]
          })
        ];
      }
    }
  }
};
