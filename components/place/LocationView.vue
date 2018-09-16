<template>
  <v-container pa-0 fluid>
    <v-img v-if="!showCategory"
      src="/images/home/142138-OTFFC4-187_test-02.svg" 
      style="margin-bottom: -1vh"
      :aspect-ratio="12/4"
      :lazy-src="LAZY_LOADING_IMAGE">
    </v-img>
    <v-container class="teal colorPrimaryText--text text-xs-center mt-0 fluid">
      <v-layout row wrap>
        <v-flex xs12>
          <h1 class="display-1 mb-0 font-weight-medium" style="font-weight: bold">Browse Educational Places Location Wise</h1>
        </v-flex>
        <v-flex xs12>
          <div class="headline">Click on tiles to see more</div>
        </v-flex>
      </v-layout>
    </v-container>
    <v-container>
      <div>
          <v-breadcrumbs large>
              <v-icon slot="divider">forward</v-icon>
              <v-breadcrumbs-item
                  v-for="item in breadcrumbs"
                  :key="item.text"
                  :disabled="item.disabled"
                  :to="item.to">
                  {{ item.text }}
              </v-breadcrumbs-item>
          </v-breadcrumbs>
        </div>
    </v-container>
    <v-container class="justify-center" v-if="showCategory">
      <v-layout row wrap class="justify-center">
        <v-flex xs6 sm4 md3 v-if="categories"
                class="ma-3 mb-3 mt-1"
                v-for="category in categories"
                :key="category.name"
                @click="onCategoryClick(category)">
          <!-- <v-card class="align-center colorPrimaryText--text text-xs-center pa-2 teal darken-4" hover>
              <div class="headline">{{category.name}}</div>
            <v-img ma-3 :src="category.thumbnail" height="15vh">
            </v-img>
          </v-card> -->
          <v-card color="cyan darken-2" class="white--text">
              <v-layout>
                <v-flex xs5 pa-2>
                  <v-img
                    :src="category.image"
                    height="100px"
                    contain
                  ></v-img>
                </v-flex>
                <v-flex xs7>
                  <v-card-title primary-title>
                    <div>
                      <div class="headline">{{category.name}}</div>
                      <div class="caption"></div>
                    </div>
                  </v-card-title>
                </v-flex>
              </v-layout>
              <v-divider light></v-divider>
              <div class="pa-3" style="height:130px">
                {{category.description}}
              </div>
              <v-card-actions class="pa-3">
                  <v-spacer></v-spacer>
                <v-btn color="grey darken-4" dark router :to="`/list/${category.key}`">Browse</v-btn>
              </v-card-actions>
            </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <v-container class="justify-center mt-3">
      <v-layout row wrap class="justify-center">
        <v-flex xs12 sm6 md3 pr-2 mt-3 v-if="localities"
                v-for="locality in localities"
                :key="locality.id"
                @click="onLocalityClick(locality)">
            <LocationName 
                :locality = locality 
                :showImage=!showCategory
                :baseRoute=baseRoute></LocationName>
        </v-flex>
      </v-layout>
    </v-container>
    <FooterMessage></FooterMessage>
  </v-container>
</template>

<script>
import images from "@/constants/images";
import LocationName from "@/components/place/LocationName";
import FooterMessage from "@/components/footer/FooterMessage";
export default {
  name: "LocationView",
   props:{
    localities: {
      type: Array,
      required: true
    },
    baseRoute:{
        type: String,
        required:true
    },
    showCategory:{
        type:Boolean,
        required:true
    },
    breadcrumbs:{
        type:Array,
        required:true,
    } 
  },
  components: { LocationName, FooterMessage },
  data: () => ({
    FOOTER_1: images.FOOTER_1,
    LAZY_LOADING_IMAGE: images.LAZY_LOADING_IMAGE
  }),
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
    },
    onLocalityClick(locality) {
      console.log("category clicked");
      this.$router.push(this.baseRoute + locality.id);
    }
  }
};
</script>

<style scoped>
</style>
