<template>
   <v-container fluid pa-0>
    <v-img 
      src="/images/home/142138-OTFFC4-187_test-02.svg" 
      style="margin-bottom: -1vh"
      :lazy-src="LAZY_LOADING_IMAGE"
      >
    </v-img>
    <v-container class="blue colorPrimaryText--text text-xs-center mt-0" fluid>
      <v-layout row wrap>
        <v-flex xs12>
          <h1 class="headline mb-0" style="font-weight: bold">Browse Educational Places Category Wise</h1>
        </v-flex>
        <v-flex xs12>
          <div style="font-size: 2vh">Click on tiles to see more</div>
        </v-flex>
      </v-layout>
    </v-container>
    <v-layout row wrap>
      <v-flex style="cursor: pointer;" xs6 sm4 md3 pr-2 v-for="locality in localities" :key="locality.id" @click="onClickSchool(locality.id)">
        <v-hover>
            <v-card
            slot-scope="{ hover }"
            :class="`elevation-${hover ? 12 : 2}`"
            class="mx-auto"
            width="344"
            >
            <v-img
                :aspect-ratio="16/9"
                src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
            ></v-img>
            <v-card-title>
                <div>
                <span class="headline">{{locality.name}}</span>
                </div>
                <v-spacer></v-spacer>
                <v-btn icon class="mr-0">
                <v-icon>mdi-chevron-right</v-icon>
                </v-btn>
            </v-card-title>
            </v-card>
        </v-hover>
      </v-flex>
    </v-layout>
   </v-container>
</template>

<script>
import config from "@/config.js";
import axios from "axios";
import ApiEndpoints from "@/constants/ApiEndpoints";
import images from "@/constants/images";

export default {
  name: "CountryWise",
  props: {
    
  },
  data: function() {
    return {
        LAZY_LOADING_IMAGE: images.LAZY_LOADING_IMAGE
    };
  },
  async asyncData ( { params } ) {
    let { data } = await axios.get(
      config.baseUrl + ApiEndpoints.GET_LOCALITIES_BY_COUNTRY_ID,{
        params: {
          countryId: params.country,
        }
      }
    );
    console.log(data);
    return { localities: data }
  },
  created() {
    
  },
  methods: {
    onClickSchool(id) {
      this.$router.push("/place/" + id);
    }
  }
};
</script>

<style scoped>
</style>

        
    
    