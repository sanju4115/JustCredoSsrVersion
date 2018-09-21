import Vue from 'vue'
import Vuetify from 'vuetify'
import colors from 'vuetify/es5/util/colors'
import "vuetify/dist/vuetify.min.css"
import vueSmoothScroll from 'vue-smoothscroll'
import ErrorAlert from "../components/alerts/ErrorAlert";
import Snotify, { SnotifyPosition } from 'vue-snotify';
import Croppa from 'vue-croppa';

//import * as VueGoogleMaps from "vue2-google-maps";



/*Vue.use(Vuetify, {
  theme: {
    primary: '#121212', // a color that is not in the material colors palette
    accent: colors.grey.darken3,
    secondary: colors.amber.darken3,
    info: colors.teal.lighten1,
    warning: colors.amber.base,
    error: colors.deepOrange.accent4,
    success: colors.green.accent3
  }
});*/

Vue.use(Vuetify, {
  theme: {
    primary: "#000000",
    secondary: "#212121",
    accent: "#8BC34A",
    error: "#FF5252",
    info: "#2196F3",
    success: "#4CAF50",
    warning: "#FFC107",
    background: "#455A64",
    indicatorColor:colors.blueGrey.darken4,
    primaryLight: "#B2DFDB",
    colorPrimaryText: "#FFFFFF",
    colorSecondaryText: "#757575",
    blueBackground: "#6200ea"
  }
});

Vue.use(vueSmoothScroll);
Vue.component("app-alert-error", ErrorAlert);

const options = {
  toast: {
    position: SnotifyPosition.rightTop
  }
};

Vue.use(Snotify, options);
Vue.use(Croppa);


//
// Vue.use(VueGoogleMaps, {
//   load: {
//     key: "AIzaSyCg9KqjmKWZOFws3MUGPdx4uPJgjlndwds",
//     libraries: "places,geocoder" // This is required if you use the Autocomplete plugin
//   }
// });
