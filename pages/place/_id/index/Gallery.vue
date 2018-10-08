<template>
    <v-container fluid grid-list-sm>
      <v-layout row wrap v-if="model.images !== null && model.images !== undefined">
        <v-flex xs4 v-for="(image,index) in model.images" :key="index" @click.stop="openCarousel(index)">
          <v-card flat tile>
            <v-img
              :alt='`${model.name} - image`'
              :src="image.url"
              height="150px"
              :lazy-src="image.url">
              <v-layout
                slot="placeholder"
                fill-height
                align-center
                justify-center
                ma-0>
                <v-progress-circular indeterminate color="primary lighten-5"></v-progress-circular>
              </v-layout>
            </v-img>
          </v-card>
        </v-flex>
      </v-layout>
      <v-dialog v-model="carouselDialogue" max-width="800px">
        <v-card>
          <v-card-title>
            Browse images here !
          </v-card-title>
          <ImageCarousel :images="model.images" :value="imageIndex"></ImageCarousel>
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
  middleware : "place",
  asyncData({ store, params }) {
    let educationalPlace = store.getters["school/schools"](params.id);
    return{
            model:educationalPlace
          }
  },
  head () {
    let model = this.model;
    return {
      title: `${model.name} | ${model.formattedAddress} | Gallery`,
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
