<template>
    <v-container fluid grid-list-sm>
      <v-layout row wrap v-if="model.images !== null && model.images !== undefined">
        <v-flex xs4 v-for="(image,index) in model.images" :key="index" @click.stop="openCarousel(index)">
          <v-card flat tile>
            <v-card-media
              :src="image.url"
              height="150px">
            </v-card-media>
          </v-card>
        </v-flex>
      </v-layout>
      <v-dialog v-model="carouselDialogue" max-width="800px">
        <v-card>
          <v-card-title>
            Browse images here !
          </v-card-title>
          <ImageCarousel :images="images" :value="imageIndex"></ImageCarousel>
          <v-card-actions>
            <v-btn color="accent" flat @click.stop="carouselDialogue=false">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>

</template>

<script>
import ImageCarousel from "@/components/utils/ImageCarousel";
import config from "@/config.js";
import axios from "axios";
import ApiEndpoints from "@/constants/ApiEndpoints";
export default {
  name: "Gallery",
  components: { ImageCarousel },
  async asyncData({ store, params }) {
    let educationalPlace = store.getters["school/schools"](params.id);
    if ( educationalPlace === null || educationalPlace === undefined){
        try {
            let { data } = await axios.get(
                config.baseUrl + ApiEndpoints.GET_EP_BY_ID,{
                    params: {
                      id: params.id,
                    }
                }
              );
              store.dispatch("school/storeSchool", {data: data })
              return{
                model:data
              }
        } catch (error) {
            console.log("middleware/place.js error ==>",error)
        }
    }
  },
  head () {
    let model = this.model;
    return {
      title: `${model.name} | Gallery`,
      meta: [
        {
          hid: `description`,
          name: 'description',
          content: `${model.name} - ${model.description}`
        },
        {
          hid: `keywords`,
          name: 'keywords',
          keywords: `${model.name},details,rating,reviews,education,feeds,
            blogs,contact,facilities,extracurriculars,acitivities,blogs,reviews`
        }
      ]
    }
  },
  data: () => ({
    show: false,
    imageIndex: 0,
    carouselDialogue: false,
  }),
  created(){
  },
  methods: {
    openCarousel(index) {
      this.imageIndex = index;
      this.carouselDialogue = true;
    }
  }
};
</script>

<style scoped>
.review div {
  font-family: "Gudea", sans-serif;
}

.review p {
  font-family: "Magra", sans-serif;
}
</style>
