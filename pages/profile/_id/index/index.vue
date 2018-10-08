<template>
  <v-card flat class="elevation-0" height="600">
    <v-container>
      <v-layout row wrap v-if="bookmarks && bookmarks.lenght > 0">
        <v-flex style="cursor: pointer;" 
          xs6 sm3 v-for="bookmark in bookmarks" 
          :key="bookmark.placeId" 
          @click="onClickSchool(bookmark.publicId)">
          <School :school="bookmark"></School>
        </v-flex>
      </v-layout>
      <v-layout row wrap v-else class="align-center">
        <v-flex xs12>
          <Message :message="message"></Message>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
import db from "@/services/firebaseInit";
import SchoolDynamic from "@/components/place/SchoolDynamic";
import School from "@/components/place/School";
import Message from "@/components/utils/Message";

export default {
  name: "Bookmarks",
  components: {Message, SchoolDynamic },
  middleware : "profile",
  asyncData({ store, params }) {
    let user = store.getters["users/user"](params.id);
    return{
            bookmarks:user.bookmarkList
          }
  },
  data: function() {
    return {
      message:"You have not bookmarked any place yet."
    };
  },
  computed:{
      currentUser(){
        return this.$store.getters["login/user"];
      }
  },
  created() {
    
  },
  methods: {
    onClickSchool(id) {
      this.$router.push("/place/schoolHome/" + id);
    }
  }
};
</script>

<style scoped>
</style>
