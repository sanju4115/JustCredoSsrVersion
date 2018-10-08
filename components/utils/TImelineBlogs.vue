<template>
  <v-container pa-0>
    <v-layout row wrap v-for="blog in blogs" :key="blog.publicId" mb-3>
      <v-card style="width: 100%">
        <v-flex>
          <BlogHeader :place="blog.epBasicDTO"></BlogHeader>
          <v-divider></v-divider>
        </v-flex>
        <v-flex>
          <v-divider></v-divider>
        </v-flex>
        <v-flex>
          <BlogBody :blog="blog"></BlogBody>
        </v-flex>
      </v-card>
    </v-layout>
    <v-layout>
      <v-flex>
        <no-ssr>
        <infinite-loading @infinite="infiniteHandler" spinner="spiral">
          <span slot="no-more">
            <v-alert class="indicatorColor" :value="true">
                  No more blogs !
            </v-alert>
          </span>
          <span slot="no-results">
            <Message :message="message"></Message>
          </span>
        </infinite-loading>
        </no-ssr>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import BlogHeader from "@/components/utils/BlogHeader";
import db from "@/services/firebaseInit";
import InfiniteLoading from "vue-infinite-loading";
import BlogBody from "@/components/utils/BlogBody";
import config from "@/config.js";
import axios from "axios";
import ApiEndpoints from "@/constants/ApiEndpoints";
import Message from "@/components/utils/Message";


export default {
  name: "TImelineBlogs",
  components: {BlogBody, BlogHeader, InfiniteLoading, Message },
  props: {
    // blogs: {
    //   type: Array,
    //   required: true
    // }
  },
  data: () => ({
    message:"You have not posted any blogs yet.",
    nextQuery: null,
    LIMIT: 1,
    firstTime: true,
    blogSubscription:null,
    page:0,
    blogs:[]
  }),
  created: function() {
    // console.log(this.schoolId);
    // this.nextQuery = db
    //   .collection("blogs")
    //   .where("schoolID", "==", this.schoolId)
    //   .orderBy("timestamp", "desc")
    //   .limit(this.LIMIT);
  },
  methods: {
    async infiniteHandler($state) {
      let idToken = this.$cookies.get('firebase-user-token');
      if(!idToken){
          this.$route.push('/login');
      }
      try {
          var configData = {
              headers: {'X-Authorization-Firebase': idToken},
              params : {
                placePublicId : this.$route.params.id,
                page:this.page,
                size:this.LIMIT
              }
            };
          let { data } = await axios.get(
              config.baseUrl + ApiEndpoints.GET_BLOGS_BY_PLACE_PUBLIC_ID,
              configData
          );
          if(data.data.length > 0){
            $state.loaded();
          }
          if(data.data.length < this.LIMIT){
             $state.complete();
          }
          data.data.forEach(element => {
            this.blogs.push(element)
          });
          this.page = this.page + 1;
      } catch (e) {
          this.$nuxt.error({ statusCode:  e.response.status, message: e.response.data.message })
      }
      // this.nextQuery
      //   .get()
      //   .then(querySnapshot => {
      //     const temp = [];
      //     querySnapshot.forEach(doc => {
      //       temp.push(doc.data());
      //     });
      //     this.blogs = this.blogs.concat(temp);
      //     if (!(this.firstTime && querySnapshot.docs.length === 0)){
      //       $state.loaded();
      //     }
      //     if (this.firstTime) {
      //       this.buildEvenListener();
      //       this.firstTime = false;
      //     }
      //     if (temp.length < this.LIMIT) {
      //       $state.complete();
      //     }else {
      //       const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
      //       this.nextQuery = db
      //         .collection("blogs")
      //         .where("schoolID", "==", this.schoolId)
      //         .orderBy("timestamp", "desc")
      //         .startAfter(lastVisible)
      //         .limit(this.LIMIT);
      //     }
      //   })
      //   .catch(function(error) {
      //     console.log("Error getting documents: ", error);
      //   });
    },
    // buildEvenListener() {
    //   this.blogSubscription = db
    //     .collection("blogs")
    //     .where("schoolID", "==", this.schoolId)
    //     .orderBy("timestamp", "desc")
    //     .limit(this.LIMIT)
    //     .onSnapshot(snapshot => {
    //       snapshot.docChanges.forEach(change => {
    //         if (change.type === "added") {
    //           const blogExist = this.blogs.find(blog => {
    //             return blog.id === change.doc.data().id;
    //           });
    //           if (!blogExist) {
    //             this.blogs.unshift(change.doc.data());
    //           }
    //         }
    //       });
    //     });
    // }
  },
  /**
   * Called before destroying this component
   *
   * un-subscribing from database listeners
   */
  beforeDestroy() {
    // if (this.blogSubscription !== null) {
    //   this.blogSubscription();
    // }
  }
};
</script>

<style scoped>
</style>
