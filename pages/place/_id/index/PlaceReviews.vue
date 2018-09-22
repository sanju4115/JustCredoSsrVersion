<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <ReviewPost :model="model"></ReviewPost>
        </v-card>
      </v-flex>
      <v-flex xs12>
        <v-layout row wrap v-if="reviews" v-for="review in reviews" mb-3>
          <v-card style="width: 100%">
            <v-flex>
              <FeedSchoolHeader :schoolID="review.schoolID"></FeedSchoolHeader>
              <v-divider></v-divider>
            </v-flex>
            <v-flex>
              <app-user-header-link :uid="review.userID"></app-user-header-link>
              <v-divider></v-divider>
            </v-flex>
            <v-flex>
              <ReviewBody :review="review"></ReviewBody>
            </v-flex>
          </v-card>
        </v-layout>
        <v-layout>
          <v-flex>
            <infinite-loading @infinite="infiniteHandler" spinner="spiral">
              <span slot="no-more">
                <v-alert class="indicatorColor" :value="true">
                      No more feeds !
                </v-alert>
              </span>
            </infinite-loading>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import InfiniteLoading from "vue-infinite-loading";
import AppUserHeaderLink from "@/components/utils/FeedUserHeader";
import db from "@/services/firebaseInit";
import FeedSchoolHeader from "@/components/utils/FeedSchoolHeader";
import ReviewBody from "@/components/utils/ReviewBody";
import Sponsored from "@/components/place/Sponsored";
import ReviewPost from "@/components/utils/ReviewPost";
export default {
  name: "PlaceReviews",
  components: {
    ReviewPost,
    Sponsored,
    ReviewBody,
    FeedSchoolHeader,
    AppUserHeaderLink,
    InfiniteLoading
  },
  head () {
      let model = this.model;
      return {
        title: `${model.name} | Reviews`,
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
    reviews: [],
    nextQuery: null,
    LIMIT: 10,
    areaSelected: null,
    firstTime: true,
    reviewSubscription: null,
    category: {
      key: "primarySchool",
      name: "Popular And Sponsored"
    },
    schoolId:null,
    model:null
  }),
  created: function() {
    this.schoolId = this.$route.params.id;
    this.model = this.$store.getters["school/school"](this.schoolId);
    this.nextQuery = db
      .collection("reviews")
      .where("schoolID", "==", this.schoolId)
      .orderBy("timestamp", "desc")
      .limit(this.LIMIT);
  },
  methods: {
    infiniteHandler($state) {
      this.nextQuery
        .get()
        .then(querySnapshot => {
          const temp = [];
          querySnapshot.forEach(doc => {
            temp.push(doc.data());
          });
          this.reviews = this.reviews.concat(temp);
          $state.loaded();
          if (this.firstTime) {
            this.buildEvenListener();
            this.firstTime = false;
          }
          if (temp.length < this.LIMIT) {
            $state.complete();
          }
          const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
          this.nextQuery = db
            .collection("reviews")
            .where("schoolID", "==", this.schoolId)
            .orderBy("timestamp", "desc")
            .startAfter(lastVisible)
            .limit(this.LIMIT);
        })
        .catch(function(error) {
          console.log("Error getting documents: ", error);
        });
    },
    buildEvenListener() {
      this.reviewSubscription = db
        .collection("reviews")
        .where("schoolID", "==", this.schoolId)
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
  computed: {
    currentUser() {
      return this.$store.getters["login/user"];
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
</style>
