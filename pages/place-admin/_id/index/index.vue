<template>
  <v-card>
    <v-layout row wrap>
      <BlogPost :model="model"></BlogPost>
      <v-flex xs12>
        <v-divider></v-divider>
      </v-flex>
       
      <!-- <v-flex xs12>
        <nuxt-child :key="$route.fullPath"></nuxt-child>
      </v-flex> -->

      <TImelineBlogs ></TImelineBlogs>
      <!-- <v-flex  xs12 text-xs-center v-if="page !==0">
        <v-card>
          <v-card-text>
            <v-pagination
              v-model="page"
              :length="length"
            ></v-pagination>
          </v-card-text>
        </v-card>
      </v-flex> -->
    </v-layout>
    <v-snackbar
      color="error"
      bottom
      v-model="errorSnackbar">
      {{ errorText }}
      <v-btn dark flat @click.native="errorSnackbar = false">Close</v-btn>
    </v-snackbar>
    <v-snackbar
      color="success"
      bottom
      v-model="successSnackBar">
      {{successText}}
      <v-btn dark flat @click.native="successSnackBar = false">Close</v-btn>
    </v-snackbar>
  </v-card>
</template>

<script>
import Address from "@/components/addPlace/Address";
import TextWithStar from "@/components/utils/TextWithStar";
import BlogPost from "@/components/utils/BlogPost";
import TImelineBlogs from "@/components/utils/TImelineBlogs";
import PlaceStat from "@/components/utils/PlaceStat";
import DescAddressPics from "@/components/utils/DescAddressPics";
import Header from "@/components/utils/Header";
import Message from "@/components/utils/Message";
import config from "@/config.js";
import axios from "axios";
import ApiEndpoints from "@/constants/ApiEndpoints";

export default {
  name: "SchoolAdminTimeline",
  components: {
    TImelineBlogs, BlogPost, Address, TextWithStar,
    Header,
    PlaceStat,
    DescAddressPics, 
    Message
  },
  middleware : "place-admin",
  async asyncData({ store, params , error, app, redirect}) {
    let placesManaged = store.getters["placeAdmin/placesManaged"](params.id);
    return{
            model:placesManaged.data,
        }
    // let idToken = app.$cookies.get('firebase-user-token');
    // if(!idToken){
    //     redirect('/login');
    // }
    // try {
    //     var configData = {
    //         headers: {'X-Authorization-Firebase': idToken},
    //         params : {
    //           placePublicId : params.id,
    //           page:0,
    //           size:1
    //         }
    //       };
    //     let { data } = await axios.get(
    //         config.baseUrl + ApiEndpoints.GET_BLOGS_BY_PLACE_PUBLIC_ID,
    //         configData
    //     );
    //     return{
    //         model:placesManaged.data,
    //         blogs:data.data,
    //         length : data.totalPages
    //     }
    // } catch (e) {
    //     error({ statusCode:  e.response.status, message: e.response.data.message })
    // }
  },
  data: () => ({
    page: 0,
    message:"You have not posted any blogs yet.",
    errorText: null,
    errorSnackbar: false,
    successSnackBar: false,
    successText: null,
    show: false,
  }),
  created() {
    this.page = this.$route.params.page
  },
  methods: {
  },
  // watch:{
  //   page(val){
  //     const placeId = this.$route.params.id;
  //     console.log(val)
  //     this.$router.push("/place-admin/"+placeId+"/timeline/"+val);
  //   }
  // }
};
</script>

<style scoped>
</style>
