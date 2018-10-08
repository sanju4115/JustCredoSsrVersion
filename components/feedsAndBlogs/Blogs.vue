<template>
  <v-container>
    <v-layout row wrap>
      <v-flex sm12 md8>
        <v-container pa-0>
          <v-layout row wrap v-if="blogs" v-for="blog in blogs" mb-3>
            <v-card style="width: 100%">
              <v-flex>
                <BlogHeader :schoolID="blog.schoolID"></BlogHeader>
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
              <infinite-loading @infinite="infiniteHandler" spinner="spiral">
          <span slot="no-more">
            <v-alert class="indicatorColor" :value="true">
                  No more blogs !
            </v-alert>
          </span>
                <span slot="no-results">
            <v-alert class="indicatorColor" :value="true">
                  No  Blogs !
            </v-alert>
          </span>
              </infinite-loading>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
      <v-flex md4 sm12 pl-2>
        <Sponsored :category="category"></Sponsored>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import BlogHeader from "../utils/BlogHeader";
  import db from "../firebaseInit";
  import InfiniteLoading from "vue-infinite-loading";
  import BlogBody from "../utils/BlogBody";
  import Sponsored from "../place/Sponsored";
  export default {
    name: "Blogs",
    components: {Sponsored, BlogBody, BlogHeader, InfiniteLoading },
    data: () => ({
      blogs: [],
      nextQuery: null,
      LIMIT: 10,
      firstTime: true,
      blogSubscription:null,
      category:{
        key:"primarySchool",
        name:"Popular And Sponsored"
      },
    }),
    created: function() {
      this.nextQuery = db
        .collection("blogs")
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
              console.log(doc.data())
            });
            this.blogs = this.blogs.concat(temp);
            if (!(this.firstTime && querySnapshot.docs.length === 0)){
              $state.loaded();
            }
            if (this.firstTime) {
              this.buildEvenListener();
              this.firstTime = false;
            }
            if (temp.length < this.LIMIT) {
              $state.complete();
            }else {
              const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
              this.nextQuery = db
                .collection("blogs")
                .orderBy("timestamp", "desc")
                .startAfter(lastVisible)
                .limit(this.LIMIT);
            }
          })
          .catch(function(error) {
            console.log("Error getting documents: ", error);
          });
      },
      buildEvenListener() {
        this.blogSubscription = db
          .collection("blogs")
          .orderBy("timestamp", "desc")
          .limit(this.LIMIT)
          .onSnapshot(snapshot => {
            snapshot.docChanges.forEach(change => {
              if (change.type === "added") {
                const blogExist = this.blogs.find(blog => {
                  return blog.id === change.doc.data().id;
                });
                if (!blogExist) {
                  this.blogs.unshift(change.doc.data());
                }
              }
            });
          });
      }
    },
    /**
     * Called before destroying this component
     *
     * un-subscribing from database listeners
     */
    beforeDestroy() {
      if (this.blogSubscription !== null) {
        this.blogSubscription();
      }
    }
  };
</script>
