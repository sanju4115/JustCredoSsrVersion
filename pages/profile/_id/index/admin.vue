<template>
  <v-card flat class="elevation-0" height="600">
    <v-container fluid grid-list-sm class="justify-center">
      <v-layout row wrap v-if="placesManaged && placesManaged.length >0">
        <v-flex xs6 sm4 v-for="place in placesManaged" :key="place.publicId" @click="onClickSchool(place.publicId)">
          <School :school="place"></School>
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
import School from "@/components/place/School";
import Message from "@/components/utils/Message";

export default {
  name: "admin",
  components: { School,Message },
  middleware : "profile-admin",
  asyncData({ store, params }) {
    let placesManaged = store.getters["users/placesManaged"](params.id);
    return{
            placesManaged:placesManaged.data
          }
  },
  data: function() {
    return {
      message:"You are not managing any places yet."
    };
  },
  created() {
    
  },
  methods: {
    onClickSchool(id) {
      this.$router.push("/place-admin/" + id);
    }
  }
};
</script>

<style scoped>
</style>
