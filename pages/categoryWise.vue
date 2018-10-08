<template>
  <v-container fluid pa-0>
    <v-img 
      src="/images/home/142138-OTFFC4-187_test-02.svg" 
      style="margin-bottom: -1vh"
      :lazy-src="LAZY_LOADING_IMAGE"
      >
    </v-img>
    <v-container class="blue colorPrimaryText--text text-xs-center mt-0" fluid v-if="!shareMessage">
      <v-layout row wrap>
        <v-flex xs12>
          <h1 class="headline mb-0" style="font-weight: bold">Browse Educational Places Category Wise</h1>
        </v-flex>
        <v-flex xs12>
          <div style="font-size: 2vh">Click on tiles to see more</div>
        </v-flex>
      </v-layout>
    </v-container>
    <v-container class="justify-center fluid mt-5" v-if="!shareMessage">
      <v-layout row wrap class="justify-center">
        <v-flex xs6 sm4 md2 v-if="categories"
                class="ma-3 mb-3 mt-3"
                v-for="category in categories"
                :key="category.name"
                @click="onCategoryClick(category)">
          <v-card class="align-center" hover>
            <v-card-media :src="category.thumbnail" height="30vh">
            </v-card-media>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <v-container light class="secondary text-xs-center mt-0 mb-5" fluid v-if="!shareMessage">
      <v-card class="transparent elevation-0 mb-2">
        <v-card-title class="justify-center colorPrimaryText--text">
          <div align="center" class="mt-2">
            <h2 class="section-title">Showing Top <span>Educational Places</span> Below</h2>
            <p class="section-intro">
              Based On Rating, Popularity And Search Location
            </p>
          </div>
        </v-card-title>
      </v-card>
    </v-container>
    <v-container 
      v-for="category in categories" 
      pa-0 mb-3 pl-3
      :key="category.key" v-if="!shareMessage">
      <TopCategoryWise :category=category></TopCategoryWise>
    </v-container>
    <v-container light class="secondary text-xs-center mt-0" fluid v-if="shareMessage">
      <v-card class="transparent elevation-0 mb-2">
        <v-card-title class="justify-center colorPrimaryText--text">
          <div align="center" class="mt-2">
            <h2 class="section-title">Sorry <span>None of the</span> Educational Place</h2>
            <p class="section-intro">
              created profile on JustCredo from the area selected by you.
            </p>
            <p class="section-intro">
              Please share so that people can join the biggest educational networking.
            </p>
          </div>
        </v-card-title>
      </v-card>
    </v-container>
    <v-parallax :src="FOOTER_1" style="height: 400px">
      <v-container>
        <v-layout row wrap fill-height class="align-center">
          <v-flex xs8 offset-xs2 class="justify-center text-xs-center">
            <v-card class="light-blue darken-3 elevation-20 mb-2">
              <v-card-title class="justify-center colorPrimaryText--text">
                <h1 class="welcome">
                  Don't have educational networking profile yet?
                </h1>
              </v-card-title>
            </v-card>
            <v-btn large
                   @click="scrollFunc()"
                   dark
                   class="pink darken-3 mt-4">
              Create Now</v-btn>
            <v-btn large
                   @click="scrollFunc()"
                   dark
                   class="cyan darken-3 mt-4">
              Know More</v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </v-parallax>
    
  </v-container>
</template>

<script>
import db from "@/services/firebaseInit";
import TopCategoryWise from "../components/TopCategoryWise";
import images from "../constants/images";
export default {
  name: "home",
  components: { TopCategoryWise },
  middleware: "schoolsCategoryWise",
  data: () => ({
    FOOTER_1: images.FOOTER_1,
    LAZY_LOADING_IMAGE: images.LAZY_LOADING_IMAGE
  }),
  created() {
    this.shareMessage = !this.$store.getters["shared/serviceAvailable"];
  },
  computed: {
    categories() {
      let categories = this.$store.getters["categories/categories"];
      return categories;
    }
  },
  methods: {
    onCategoryClick(category) {
      console.log("category clicked");
      this.$router.push("/list/" + category.key);
    }
  },
  mounted() {
    
  }
};
</script>

<style scoped>
.section-title {
  margin-top: 0;
  letter-spacing: 2px;
  font-weight: 100;
  font-size: 3vh;
}
.section-title span {
  font-weight: 400;
}
.section-intro {
  margin: 1vh 8vh 5vh 5vh;
  font-size: 3vh;
  line-height: 5vh;
  font-weight: 400;
  letter-spacing: 0.1vh;
  font-family: Agency FB, sans-serif;
}
.welcome {
  font-family: "Roboto", sans-serif;
  font-weight: 800;
  line-height: 4.8vh;
  font-size: 4.3vh;
}
</style>
