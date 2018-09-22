<template>
  <v-container pa-0>
    <v-layout style="width: 100%" v-if="!model">
      <v-flex xs12 class="text-xs-center">
        <v-progress-circular
          indeterminate
          class="accent--text"
          :width="3"
          :size="30"
        ></v-progress-circular>
      </v-flex>
    </v-layout>
    <v-layout row wrap v-else>
      <v-flex xs12 md12 sm12>
        <v-carousel hide-delimiters dark style="height: 400px">
          <v-carousel-item
            v-if="model.images"
            v-for="(item,i) in model.images"
            :src="item.url" :key="i"></v-carousel-item>
        </v-carousel>
      </v-flex>
    </v-layout>
    <v-container v-if="!loading">
      <v-layout row wrap>
        <v-flex xs12>
          <v-card class="elevation-0">
            <v-card-title primary-title>
              <div class="review">
                <div class="headline">{{model.name}}</div>
                <span class="grey--text">{{model.formattedAddress}}</span>
              </div>
              <v-spacer></v-spacer>
              <v-chip disabled color="background" text-color="white">
                <v-avatar>
                  <v-icon>check_circle</v-icon>
                </v-avatar>
                Verified
              </v-chip>
            </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn icon dark @click.native="show = !show" color="background">
                <v-icon>{{ show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
              </v-btn>
            </v-card-actions>
            <v-slide-y-transition>
              <v-card-text v-show="show">
                {{model.description}}
              </v-card-text>
            </v-slide-y-transition>
          </v-card>
        </v-flex>
        <v-flex>
          <v-divider></v-divider>
          <v-card class="elevation-0">
            <v-container v-if="model.noOfReviews !== 0 && model.noOfReviews !== null && model.noOfReviews !== undefined">
              <v-layout row>
                <v-flex sm2 class="mr-2">
                  <v-chip disabled color="background" text-color="white" >
                    {{model.rating}} Rating
                    <v-icon right small>star</v-icon>
                  </v-chip>
                </v-flex>
                <v-flex sm8>
                  <div>Based on {{model.noOfReviews}} ratings</div>
                  <div>Weighted average based on user's credibility on JustCredo.</div>
                </v-flex>
              </v-layout>
            </v-container>
            <v-divider light></v-divider>
            <v-container>
              <v-layout class="align-center">
                <v-flex sm1 xs1>
                  <v-avatar
                    class="grey lighten-4">
                    <img src="/static/apple-touch-icon-180x180.png" alt="avatar">
                  </v-avatar>
                </v-flex>
                <v-flex sm9 xs8>
                  <v-container>
                    <v-flex class="review">
                      <div>Sanjay Kumar reviewed it.</div>
                      <div style="font-weight: bold">Read all reviews.</div>
                    </v-flex>
                  </v-container>
                </v-flex>
              </v-layout>
            </v-container>
            <v-divider></v-divider>
            <v-container>
              <v-layout class="align-center text-xs-center">
                <v-flex sm8 xs8 md6 class="review">
                  <div class="headline">How was your experience?</div>
                  <div>Tell everyone about it.</div>
                </v-flex>
                <v-flex sm4 xs4>
                  <v-btn color="success" @click="onReviewClick">Write Review</v-btn>
                </v-flex>
              </v-layout>
            </v-container>
            <v-divider></v-divider>
            <v-container>
              <v-layout row wrap>
                <v-flex sm6 v-if="model.subCategories !== null && model.subCategories !== undefined">
                  <v-list dense>
                    <div class="heading ml-3" style="font-weight: bold">Categories</div>
                    <v-list-tile v-for="(item,i) in model.subCategories" :key="i">
                      <v-list-tile-action>
                        <v-icon color="blue">star</v-icon>
                      </v-list-tile-action>
                      <v-list-tile-content>
                        <v-list-tile-title v-text="item.name"></v-list-tile-title>
                      </v-list-tile-content>
                    </v-list-tile>
                  </v-list>
                </v-flex>
                <v-flex sm6 v-if="model.genders !== null && model.genders !== undefined">
                  <v-list dense>
                    <div class="heading ml-3" style="font-weight: bold">Type</div>
                    <v-list-tile v-for="(item,i) in model.genders" :key="i" class="ma-0">
                      <v-list-tile-action>
                        <v-icon color="blue">star</v-icon>
                      </v-list-tile-action>
                      <v-list-tile-content dense>
                        <v-list-tile-title v-text="item.name"></v-list-tile-title>
                      </v-list-tile-content>
                    </v-list-tile>
                  </v-list>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-container>

</template>

<script>
import config from "@/config.js";
import axios from "axios";
import ApiEndpoints from "@/constants/ApiEndpoints";

export default {
  name: "INDEX",
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
    }else{
      return{
              model:educationalPlace
            }
    }
  },
  head () {
    let model = this.model;
    console.log(model)
    return {
      title: `${model.name} | ${model.formattedAddress} | Details`,
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
            blogs,contact,facilities,extracurriculars,acitivities,blogs,reviews`        }
      ]
    }
  },
  data: () => ({
    show: false,
    loading:false,
  }),
  created(){
  },
  methods:{
    onReviewClick: function () {
    }
  }
};
</script>

<style scoped>
  .review div{
    font-family: 'Gudea', sans-serif;
  }

  .review p{
    font-family: 'Magra', sans-serif;
  }
</style>
