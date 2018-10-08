<template>
  <v-card class="grey lighten-3">
    <v-container>
     <v-layout row wrap>
      <v-flex xs12 md8 sm12 nestedScroll>
        <v-layout row wrap v-if="reviews" v-for="review in reviews" mb-3>
          <v-card style="width: 100%">
            <v-flex>
              <!-- <FeedSchoolHeader :school="review.place"></FeedSchoolHeader> -->
              <v-divider></v-divider>
            </v-flex>
            <v-flex>
              <!-- <app-user-header-link :uid="review.userID"></app-user-header-link> -->
              <v-divider></v-divider>
            </v-flex>
            <v-flex>
              <ReviewBody :review="review"></ReviewBody>
            </v-flex>
          </v-card>
        </v-layout>
        <v-layout>
          <v-flex>
            <no-ssr>
              <infinite-loading @infinite="infiniteHandler" spinner="spiral">
                <span slot="no-more">
                  <v-alert class="indicatorColor" :value="true">
                        No more feeds !
                  </v-alert>
                </span>
                <span slot="no-results">
                  <v-alert class="indicatorColor" :value="true">
                        No  Feeds !
                  </v-alert>
                </span>
              </infinite-loading>
            </no-ssr>
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
import InfiniteLoading from "vue-infinite-loading";
import AppUserHeaderLink from "@/components/feedsAndBlogs/FeedUserHeader";
import db from "@/services/firebaseInit";
import FeedSchoolHeader from "@/components/feedsAndBlogs/FeedSchoolHeader";
import ReviewBody from "@/components/feedsAndBlogs/ReviewBody";
import Sponsored from "@/components/place/Sponsored";
import config from "@/config.js";
import axios from "axios";
import ApiEndpoints from "@/constants/ApiEndpoints";

export default {
  name: "Feed",
  components: {
    Sponsored,
    ReviewBody,
    FeedSchoolHeader,
    AppUserHeaderLink,
    InfiniteLoading
  },
  middleware: "feed",
  head () {
    return {
      title: "Educational Places Rating/Reviews Feeds",
      meta: [
        {
          hid: `description`,
          name: 'description',
          content: "Rating and reviews of educational places."
        },
        {
          hid: `keywords`,
          name: 'keywords',
          keywords: 'rating,reviews,education,feeds'
        }
      ]
    }
  },
  async asyncData ( { store	} ) {
    let currentUser = store.getters["login/user"];
    let currentUserId = "";
    if(currentUser !== undefined && currentUser !== null){
      currentUserId = currentUser.uid;
    }
    const areaRangeSelected = store.getters["shared/areaSelected"];
    let location = store.getters["location/location"];
    let params= {
                    currentUserId: currentUserId,
                    geoHash: areaRangeSelected,
                    geoHashValue: (location !== null && location !== undefined ) ? location[areaRangeSelected] : "",
                    page: 0,
                    size:20
                };
    let { data } = await axios.get(
      config.baseUrl + ApiEndpoints.FEED_LOCATION_WISE, {params: params}
    );
    console.log(data);
    return { reviews: data }
  },
  data: () => ({
    nextQuery: null,
    LIMIT: 10,
    areaSelected: null,
    firstTime: true,
    sticky:null,
    sponsored:null,
    reviewSubscription:null,
    category:{
      key:"primarySchool",
      name:"Popular And Sponsored"
    },
    location:null
  }),
  created: function() {
    
  },
  methods: {
    infiniteHandler($state) {
      // this.nextQuery
      //   .get()
      //   .then(querySnapshot => {
      //     const temp = [];
      //     querySnapshot.forEach(doc => {
      //       console.log(doc.data())
      //       temp.push(doc.data());
      //     });
      //     this.reviews = this.reviews.concat(temp);
      //     $state.loaded();
      //     if (this.firstTime) {
      //       this.buildEvenListener();
      //       this.firstTime = false;
      //     }
      //     if (temp.length < this.LIMIT) {
      //       $state.complete();
      //     }
      //     const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
      //     this.nextQuery = db
      //       .collection("reviews")
      //       .where(
      //         "geoHash." + this.areaSelected,
      //         "==",
      //         this.location[this.areaSelected]
      //       )
      //       .orderBy("timestamp", "desc")
      //       .startAfter(lastVisible)
      //       .limit(this.LIMIT);
      //   })
      //   .catch(function(error) {
      //     console.log("Error getting documents: ", error);
      //   });
    },
    buildEvenListener() {
      this.reviewSubscription = db
        .collection("reviews")
        .where(
          "geoHash." + this.areaSelected,
          "==",
          this.location[this.areaSelected]
        )
        .orderBy("timestamp", "desc")
        .limit(this.LIMIT)
        .onSnapshot(snapshot => {
          snapshot.docChanges.forEach(change => {
            if (change.type === "added") {
              const reviewExist = this.reviews.find(review => {
                return review.id === change.doc.data().id;
              });

              if (!reviewExist) {
                console.log("New review: ", change.doc.data());
                this.reviews.unshift(change.doc.data());
              }
            }
          });
        });
    }
  },
  mounted() {
  },
  computed: {
    currentUser() {
      return this.$store.getters["user/user"];
    }
  },

  /**
   * Called before destroying this component
   *
   * un-subscribing from database listeners
   */
  beforeDestroy() {
    if (this.reviewSubscription !== null) {
      this.reviewSubscription();
    }
  }
};
</script>

<style scoped>
  .sticky {
    position: fixed;
    justify-content: end;
    right: 0;
    top: 0;
  }

  .tilled div {
    font-family: "Gudea", sans-serif;
  }

  .tilled p {
    font-family: "Magra", sans-serif;
  }

  .tilled {
    position: relative;
    display: inline-block;
    padding: 1em 5em 1em 1em;
    overflow: hidden;
    color: #fff;
    margin-right: -30px;
  }

  .tilled:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    -webkit-transform-origin: 100% 0;
    -ms-transform-origin: 100% 0;
    transform-origin: 100% 0;
    -webkit-transform: skew(15deg);
    -ms-transform: skew(15deg);
    transform: skew(15deg);
    z-index: -1;
  }

  .nestedScroll {
    overflow: auto;
    height: 1050px;
    display:block;
  }
</style>
