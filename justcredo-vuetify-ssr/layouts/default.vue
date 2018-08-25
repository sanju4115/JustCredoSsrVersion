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
    </v-content>
    <!--<v-dialog v-model="dialog" width="500px" color="primary">
      <LoginAndRegister @closeDialogue="dialog=false"></LoginAndRegister>
    </v-dialog>-->
    <Footer></Footer>
  </v-app>
</template>

<script>
import NavigationDrawer from "../components/navigationDrawer/NavigationDrawer";
import Toolbar from "../components/toolbar/Toolbar";
import Footer from "../components/footer/Footer";
import schoolsCategoryWise from "../middleware/schoolsCategoryWise";
export default {
  components: {Footer, Toolbar, NavigationDrawer },
  data() {
    return {
      dialog: false,
      drawer: true
    };
  },
  computed:{
    range(){
      schoolsCategoryWise();
      console.log(this.$refs.page)
      this.$refs.page.$forceUpdate();
      return this.$store.getters["shared/areaSelected"];
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
