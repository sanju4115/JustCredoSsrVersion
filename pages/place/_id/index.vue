<template>
  <v-card class="grey lighten-3">
    <v-container class="pa-2">
      <v-layout row wrap>
        <v-flex xs12 md8 sm12 class="text-sm-left">
          <v-layout row wrap>
            <v-flex xs12 md12 sm12 class="mb-3">
              <v-layout row wrap>
                <v-flex xs12 md12 sm12>
                  <v-carousel hide-delimiters dark style="height: 400px">
                    <v-carousel-item
                      v-if="model.images"
                      v-for="(item,i) in model.images"
                      :src="item.url" :key="i"></v-carousel-item>
                  </v-carousel>
                </v-flex>
              </v-layout>
              <v-tabs
                dark
                color="indicatorColor"
                show-arrows>
                <v-tabs-slider color="white"></v-tabs-slider>
                <v-tab
                  v-for="(item,index) in tabItems" :key = "index" router :to="'/'+item.link">
                  {{ item.text }}
                </v-tab>
              </v-tabs>
              <div>
                <nuxt-child :key="$route.fullPath" class="nestedScroll white"></nuxt-child>
              </div>
              <!--<router-view :key="$route.fullPath" class="nestedScroll white"></router-view>-->
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex xs12 md4 sm12 id="sponsored" class="pl-3">
          <Sponsored :category="category"></Sponsored>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
import Sponsored from "../../../components/place/Sponsored";
export default {
  name: "SchoolHome",
  components: {
    Sponsored
  },
  middleware : "place",
  asyncData({ store, params }) {
    let educationalPlace = store.getters["school/schools"](params.id);
    return{
            model:educationalPlace
          }
  },
  data() {
    return {
      category: {
        key: "primarySchool",
        name: "Popular And Sponsored"
      },
      tabItems: []
    };
  },
  created() {
    let id = this.$route.params.id;
    this.tabItems = [
      { text: "Details", link: "place/" + id + "/" },
      { text: "Classes", link: "place/" + id + "/school-classes" },
      { text: "Facilities", link: "place/" + id + "/facility-and-extra" },
      { text: "Gallery", link: "place/" + id + "/gallery" },
      { text: "Blogs", link: "place/" + id + "/place-blogs" },
      { text: "Reviews", link: "place/" + id + "/place-reviews" },
      { text: "Contact", link: "place/" + id + "/gallery" }
    ];
  },
  computed: {}
};
</script>

<style scoped>
.content {
  width: 100%;
  text-align: center;
  overflow: hidden;
}

img {
  position: relative;
  left: 100%;
  margin-left: -200%;
  object-fit: cover;
}

.nestedScroll {
  overflow: auto;
  height: 1000px;
  display: block;
}
</style>
