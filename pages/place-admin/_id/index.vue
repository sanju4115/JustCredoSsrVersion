<template>
  <v-card class="grey lighten-3">
    <v-container>
      <v-layout row wrap>
        <v-flex md12 lg8>
          <v-layout row wrap>
            <v-flex xs12>
              <ChangeCoverPic
                :model="model"
                db="schools"
                @picUploaded="coverPicUploaded"></ChangeCoverPic>
            </v-flex>
            <v-flex xs12 class="text-sm-left">
              <v-layout row wrap>
                <v-flex xs12 class="mb-3">
                  <v-tabs
                    dark
                    color="indicatorColor"
                    show-arrows>
                    <v-tabs-slider color="white"></v-tabs-slider>
                    <v-tab
                      v-for="(item,index) in tabItems" :to="{name:item.link}" :key="index">
                      {{ item.text }}
                    </v-tab>
                  </v-tabs>
                  <nuxt-child :key="$route.fullPath"></nuxt-child>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex md12 lg4 pl-4>
          <Header text="Real Time Updates"></Header>
          <v-layout row wrap mb-5>
            <v-flex xs6 pa-2>
              <PlaceStat
                :loading="false"
                text="Average Rating"
                :total-count="model.rating"
                color="blue"
                icon="stars"
              ></PlaceStat>
            </v-flex>
            <v-flex xs6 pa-2>
              <PlaceStat
                :loading="false"
                text="Total Bookmarks"
                :total-count="model.noOfBookmarks"
                color="red"
                icon="bookmark"
              ></PlaceStat>
            </v-flex>
            <v-flex xs6 pa-2>
              <PlaceStat
                :loading="false"
                text="Total Reviews"
                :total-count="model.noOfReviews"
                color="green"
                icon="rate_review"
              ></PlaceStat>
            </v-flex>
            <v-flex xs6 pa-2>
              <PlaceStat
                :loading="false"
                text="Total Blogs"
                :total-count="model.noOfBookmarks"
                color="grey"
                icon="rss_feed"
              ></PlaceStat>
            </v-flex>
          </v-layout>
          <Header text="Details"></Header>
          <DescAddressPics :model="model"></DescAddressPics>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
import db from "@/services/firebaseInit";
import ChangeCoverPic from "@/components/utils/ChangeCoverPic";
import PlaceStat from "@/components/utils/PlaceStat";
import DescAddressPics from "@/components/utils/DescAddressPics";
import Header from "@/components/utils/Header";
import config from "@/config.js";
import axios from "axios";
import ApiEndpoints from "@/constants/ApiEndpoints";

export default {
  name: "PlaceAdminHome",
  components: {
    Header,
    PlaceStat,
    DescAddressPics,
    ChangeCoverPic,
    
  },
  middleware : "place-admin",
  asyncData({ store, params }) {
    let placesManaged = store.getters["placeAdmin/placesManaged"](params.id);
    return{
            model:placesManaged.data
          }
  },
  data() {
    return {
      tabItems: []
    };
  },
  methods: {
    coverPicUploaded(url){
      this.model.coverPic = url;
    }
  },
  created() {
    const id = this.$route.params.id;
    this.tabItems = [
      { text: "Timeline", link:  "place-admin/" + id + "/" },
      { text: "Classes", link: "place-admin/" + id +"/SchoolClasses" },
      { text: "Facilities", link: "place-admin/" + id +"/FacilityAndExtra" },
      { text: "Gallery", link: "place-admin/" + id +"/SchoolGallery" },
      { text: "Blogs", link: "place-admin/" + id +"/SchoolGallery" },
      { text: "Reviews", link: "place-admin/" + id +"/SchoolGallery" },
      { text: "Contact", link: "place-admin/" + id +"/SchoolGallery" }
    ]
  }
};
</script>

<style scoped>
.nestedScroll {
  overflow: auto;
  height: 1000px;
  display: block;
}

.welcome {
  font-family: "Roboto", sans-serif;
  font-weight: 800;
  line-height: 3vh;
  font-size: 3vh;
  color: black;
}
</style>
