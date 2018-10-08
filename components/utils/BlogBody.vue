<template>
  <v-container grid-list-md >
    <v-layout row wrap pa-2>
      <v-flex d-flex xs12 class="justify-end">
        {{timeOfReview}} ago
      </v-flex>
      <v-flex xs12>
        <!-- <p class="title">{{blog.heading}}</p>
        <p>{{blog.blogText}}</p> -->
         <div v-html="blog.blogContent" class="pa-3">
                    </div>
      </v-flex>
      <v-flex xs12 sm12 md12 v-if="blog.blogImageDTOList.length > 0">
        <ImageListView :images="blog.blogImageDTOList"></ImageListView>
      </v-flex>
      <!-- <v-flex xs12 sm6 class="py-2" v-if="loadingComment || loadingComment">
        <v-progress-circular
          class="ml-3"
          indeterminate color="accent"
          :size="20" :width="2">
        </v-progress-circular>
      </v-flex> -->
      <v-flex xs12 sm6 class="py-2">
        <p>Likes &amp; Comments</p>
        <v-chip label color="colorPrimaryText" :text-color="textColorLike" @click="likeOrUnlike">
          <span class="mr-2">{{blog.blogLikeDTOList.length}} </span>
          <v-icon :color="likeIconColor" center small style="cursor : pointer">thumb_up</v-icon>
        </v-chip>
        <v-chip label color="colorPrimaryText" :text-color="textColorComment">
          <span class="mr-2">{{blog.blogCommentDTOList.length}}</span>
          <v-icon :color="commentIconColor" center small style="cursor : pointer">comment</v-icon>
        </v-chip>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import TImeUtil from "../../utils/TImeUtil";
  import ImageListView from "../utils/ImageListView";
  import db from "../../services/firebaseInit";

export default {
  name: "BlogBody",
  components: { ImageListView },
  props: {
    blog: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    icon: "justify",
    likesNum: 0,
    commentsNum: 0,
    loadingComment: true,
    loadingLikes: true,
    likeSubscription: null,
    commentSubscription: null,
    isUserLiked: false,
    isUserCommented: false,
    currentUser: null,
    textColorLike: "colorSecondaryText", // default values
    likeIconColor: "secondaryIcon",
    textColorComment: "colorSecondaryText",
    commentIconColor: "secondaryIcon",
    userLikeId: null
  }),
  created: function() {
    // /**
    //  * Getting the user from the store
    //  */
    // this.currentUser = this.$store.getters["login/user"];

    // /**
    //  * Queries on the collection blogLikes of the db
    //  * to find out the number of likes of the
    //  * blog
    //  *
    //  * Tags a listener that will invoked if any change
    //  * occurs in the db for the query
    //  *
    //  * Finds if the current user liked the blog or not
    //  * If current user liked the blog change the color
    //  *
    //  */
    // this.likeSubscription = db
    //   .collection("blog_detail")
    //   .doc(this.blog.id)
    //   .collection("likes")
    //   .onSnapshot(querySnapshot => {
    //     this.likesNum = querySnapshot.docs.length;
    //     querySnapshot.forEach(doc => {
    //       if (doc.data().userID === this.currentUser.uid) {
    //         this.isUserLiked = true;
    //         this.userLikeId = doc.id;
    //         this.textColorLike = "accent";
    //         this.likeIconColor = "accent";
    //       }
    //     });
    //     this.loadingLikes = false;
    //   });

    // /**
    //  * Queries on the collection reviewComments of the db
    //  * to find out the number of comments of the
    //  * blog
    //  *
    //  * Tags a listener that will invoked if any change
    //  * occurs in the db for the query
    //  *
    //  * Finds if the current user commented the blog or not
    //  * If current user commented the blog change the color
    //  *
    //  */
    // this.commentSubscription = db
    //   .collection("blog_detail")
    //   .doc(this.blog.id)
    //   .collection("comments")
    //   .onSnapshot(querySnapshot => {
    //     this.commentsNum = querySnapshot.docs.length;
    //     querySnapshot.forEach(doc => {
    //       if (doc.data().userID === this.currentUser.uid) {
    //         this.isUserCommented = true;
    //         this.textColorComment = "accent";
    //         this.commentIconColor = "accent";
    //       }
    //     });
    //     this.loadingComment = false;
    //   });
  },
  methods: {
    // /**
    //  * Method will run when user clicks on the like button
    //  * 1. If user is already liked it then then it will delete
    //  *    that like document form the reviewLike collection
    //  * 2. If user is liking the blog then it will create a
    //  *    new document in the reviewLike collection
    //  *
    //  * Also changes the color of the icons accordingly
    //  *
    //  */
    // likeOrUnlike: function() {
    //   if (!this.isUserLiked) {
    //     console.log("not liked earlier");
    //     const batch = db.batch();
    //     const blogLikeRef = db.collection("blog_detail")
    //       .doc(this.blog.id)
    //       .collection("likes").doc(this.currentUser.uid);
    //     batch.set(blogLikeRef, {
    //       userID: this.currentUser.uid,
    //       blogID: this.blog.id,
    //       id: this.currentUser.uid,
    //       timestamp:new Date(),
    //     });
    //     batch
    //       .commit()
    //       .then(() => {
    //         console.log("liked success");
    //         this.isUserLiked = true;
    //       })
    //       .catch(function(error) {
    //         console.log("liked not success =>"+error);
    //       });
    //   } else {
    //     this.textColorLike = "colorSecondaryText";
    //     this.likeIconColor = "secondaryIcon";
    //     const batch = db.batch();
    //     const blogLikeRef = db.collection("blog_detail")
    //                           .doc(this.blog.id)
    //                           .collection("likes").doc(this.currentUser.uid);
    //     batch.delete(blogLikeRef);
    //     batch
    //       .commit()
    //       .then(() => {
    //         this.isUserLiked = false;
    //       })
    //       .catch(function(error) {
    //         console.log(error);
    //       });
    //   }
    // }
  },
  computed: {
    timeOfReview() {
      return TImeUtil.timeDifference(this.blog.createdAt);
    }
  },
  /**
   * Called before destroying this component
   *
   * un-subscribing from database listeners
   */
  beforeDestroy() {
    // this.likeSubscription();
    // this.commentSubscription();
  }
};
</script>

<style scoped>
</style>
