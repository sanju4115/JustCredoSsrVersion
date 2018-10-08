<template>
    <v-layout row wrap>
        <TImelineBlogs :blogs="blogs"></TImelineBlogs>
        <v-flex  xs12 text-xs-center v-if="currentPage !==0">
        <v-card>
          <v-card-text>
            <v-pagination
              :value="currentPage"
              v-model="page"
              :length="length"
            ></v-pagination>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
</template>

<script>
import TImelineBlogs from "@/components/utils/TImelineBlogs";
import config from "@/config.js";
import axios from "axios";
import ApiEndpoints from "@/constants/ApiEndpoints";

export default {
  name: "SchoolAdminTimeline",
  components: {
    TImelineBlogs
  },
  data: () => ({
    page:0,
    currentPage:0
  }),
 async asyncData({ store, params , error, app, redirect}) {
     console.log(params)
    let idToken = app.$cookies.get('firebase-user-token');
    if(!idToken){
        redirect('/login');
    }
    try {
        var configData = {
            headers: {'X-Authorization-Firebase': idToken},
            params : {
              placePublicId : params.id,
              page:params.page,
              size:1
            }
          };
        let { data } = await axios.get(
            config.baseUrl + ApiEndpoints.GET_BLOGS_BY_PLACE_PUBLIC_ID,
            configData
        );
        return{
            blogs:data.data,
            length : data.totalPages
        }
    } catch (e) {
        error({ statusCode:  e.response.status, message: e.response.data.message })
    }
  },
  created() {
    this.currentPage = this.$route.params.page
  },
  methods: {
  }
};
</script>

<style scoped>
</style>
