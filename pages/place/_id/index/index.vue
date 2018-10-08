<template>
  <v-container pa-0 v-if="model">
      <v-layout row wrap>
        <v-flex xs12 pa-2>
          <v-card class="elevation-0">
            <v-card-title primary-title>
              <div class="display-1 font-weight-bold">
                <v-icon x-large color="success">verified_user</v-icon>
                {{model.name}}
              </div>
              <div class="subheading ml-5" style="width:500px">{{model.formattedAddress}}</div>
            </v-card-title>
          </v-card>
        </v-flex>
        <v-flex xs12>
          <v-divider></v-divider>
        </v-flex>
        <v-flex pa-2 xs12>
          <v-card flat xs8 class="pl-2" v-if="model.noOfReviews !== 0 && model.noOfReviews !== null && model.noOfReviews !== undefined">
            <v-card-title primary-title>
              <div class="title font-weight-bold">
                Rating given by people
                <v-chip small color="light-blue darken-4" text-color="white">
                  {{model.rating}}/10
                  <v-icon right>star</v-icon>
                </v-chip>
              </div>
              <div class="font-italic">Based on {{model.noOfReviews}} ratings and weighted average based on user's credibility on JustCredo.</div>
            </v-card-title>             
            <v-card-actions class="pa-3">
              <v-layout row wrap>
                <v-flex xs6 >
                    Academics
                    <span class="grey--text caption mr-2">
                        ({{ model.ratingAcademics }})
                    </span>
                </v-flex>
                <v-flex xs6>
                  <v-rating
                      v-model="model.ratingAcademics"
                      readonly
                      background-color="grey lighten-3"
                      color="pink darken-4"
                      length="10"
                      dense
                      half-increments
                      hover
                      size="24">
                  </v-rating>
                </v-flex>
                <v-flex xs6 >
                    Facilities
                    <span class="grey--text caption mr-2">
                        ({{ model.ratingFacilities }})
                    </span>
                </v-flex>
                <v-flex xs6>
                  <v-rating
                      v-model="model.ratingFacilities"
                      readonly
                      background-color="grey lighten-3"
                      color="red accent-4"
                      length="10"
                      dense
                      half-increments
                      hover
                      size="24">
                  </v-rating>
                </v-flex>
                <v-flex xs6 >
                    Extracurricular Activities
                    <span class="grey--text caption mr-2">
                        ({{ model.ratingExtracurricular }})
                    </span>
                </v-flex>
                <v-flex xs6>
                  <v-rating
                      readonly
                      v-model="model.ratingExtracurricular"
                      background-color="grey lighten-3"
                      color="cyan darken-3"
                      length="10"
                      dense
                      half-increments
                      hover
                      size="24">
                    </v-rating>
                </v-flex>
              </v-layout>
            </v-card-actions>
          </v-card>
        </v-flex>
        <v-flex v-if="model.noOfReviews !== 0 && model.noOfReviews !== null && model.noOfReviews !== undefined">
          <v-divider></v-divider>
        </v-flex>
        <v-flex>          
          <v-card class="elevation-0">
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
                        <v-icon color="light-blue darken-4">send</v-icon>
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
         <v-flex xs12>
          <v-divider></v-divider>
        </v-flex>
        <v-flex pa-2>
          <v-card flat>
            <v-card-actions>
              <div class="subheading font-weight-bold pa-2">
                <v-icon medium color="info">description</v-icon>
                Description</div>
              <v-btn icon light @click.native="show = !show">
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
      </v-layout>
    </v-container>
</template>

<script>
import config from "@/config.js";
import axios from "axios";
import ApiEndpoints from "@/constants/ApiEndpoints";

export default {
  name: "INDEX",
  middleware : "place",
  asyncData({ store, params }) {
    let educationalPlace = store.getters["school/schools"](params.id);
    return{
            model:educationalPlace
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
    show: true,
    loading:false,
  }),
  created(){
  },
  methods:{
    onReviewClick: function () {
      this.$router.push("/review/" + this.model.publicId);
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
