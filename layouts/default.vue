<template>
  <v-app id="inspire">
    <NavigationDrawer
      :drawerState="drawer"></NavigationDrawer>
    <Toolbar
      @onLogoClicked="drawer = !drawer"
      @onLoginBtnClick="dialog = !dialog"></Toolbar>
    <v-content class="grey lighten-3">
      <v-container pa-0 fluid>
        <nuxt ref="page"/>
      </v-container>
      <!--<vue-snotify></vue-snotify>-->
      <!--Start of Location Dialogue Box-->
    <v-dialog persistent v-model="locationView" width="500px">
      <v-card class="grey darken-4 elevation-0">
        <PlaceLocation
          @closeLocationPopup="locationView = !locationView">
        </PlaceLocation>
        <v-card-actions class="align-content-end justify-end">
          <v-btn flat
                 v-if="!loading && location"
                 dark
                 @click.stop="locationView = !locationView">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!--End of Location Dialogue Box-->
    </v-content>
    <Footer></Footer>
    <v-snackbar
      color="error"
      bottom
      v-model="errorSnackbar">
      {{ errorText }}
      <v-btn dark flat @click.native="closeErrorSnackbar()">Close</v-btn>
    </v-snackbar>
    <v-snackbar
      color="success"
      bottom
      v-model="successSnackbar">
      {{ successText }}
      <v-btn dark flat @click.native="closeSuccessSnackbar()">Close</v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
import NavigationDrawer from "../components/navigationDrawer/NavigationDrawer";
import Toolbar from "../components/toolbar/Toolbar";
import Footer from "../components/footer/Footer";
import PlaceLocation from "@/components/distance/PlaceLocation";

export default {
  components: { Footer, Toolbar, NavigationDrawer,PlaceLocation },
  data() {
    return {
      dialog: false,
      drawer: false,
      locationView: false
    };
  },
  mounted(){
    this.drawer = true
    // if (!this.location) {
    //   this.locationView = true;
    // } else {
    //   if (!localStorage.getItem("firstTime")) {
    //     this.locationView = true;
    //     localStorage.setItem("firstTime", "true");
    //   }
    // }
  },
  methods:{
    closeErrorSnackbar(){
          this.$store.dispatch("shared/setErrorSnackbar",false);
    },
    closeSuccessSnackbar(){
          this.$store.dispatch("shared/setErrorSnackbar",false);
    }
  },
  computed: {
    location() {
      return this.$store.getters["location/location"];
    },
    loading() {
      return this.$store.getters["location/loading"];
    },
    errorText(){
      return this.$store.getters["shared/errorText"];
    },
    errorSnackbar(){
      return this.$store.getters["shared/errorSnackbar"];
    },
    successText(){
      return this.$store.getters["shared/successText"];
    },
    successSnackbar(){
      return this.$store.getters["shared/successSnackbar"];
    }
  },
  head() {
    return {
      script: [
        {
          src:
            "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"
        },
        {
          src: "https://use.fontawesome.com/releases/v5.0.9/js/all.js",
          integrity:
            "sha384-8iPTk2s/jMVj81dnzb/iFR2sdA7u06vHJyyLlAd4snFpCl/SnyUjRrbdJsw1pGIl",
          crossorigin: "anonymous"
        },
        { src: "/js/css3-animate-it.js" },
        {
          src:
            "https://cdnjs.cloudflare.com/ajax/libs/jQuery-viewport-checker/1.8.8/jquery.viewportchecker.min.js"
        }
      ],
      link: [
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css?family=Roboto"
        },
        {
          rel: "stylesheet",
          href: "https://cdn.firebase.com/libs/firebaseui/2.7.0/firebaseui.css"
        }
      ]
    };
  }
};
</script>
