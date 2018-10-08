<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap v-if="loadingSchool || loadingSchool">
      <v-flex d-flex xs6 sm9 md9 class="py-2">
        <v-progress-circular 
          class="ml-3" 
          indeterminate 
          color="accent" 
          :size="20" 
          :width="2">
        </v-progress-circular>
      </v-flex>
    </v-layout>
    <v-layout row wrap v-else>
      <v-flex d-flex xs3 sm2 md2>
        <v-avatar size="50">
          <img :src="place.coverPic">
        </v-avatar>
      </v-flex>
      <v-flex d-flex xs6 sm9 md9>
        <v-layout row wrap>
          <v-flex d-flex>
            <div>
              <h4 class="mb-0">{{place.name}}</h4>
              <div style="font-size: 12px">{{place.formattedAddress}}</div>
            </div>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>

export default {
  name: "BlogHeader",
  props: {
    place: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    school: null,
    loadingSchool: false
  }),
  methods:{
    findSchool(id) {
      const school = this.$store.getters.school(id);
      if (school === undefined || school === null) {
        this.$store
          .dispatch("findSchool", { id: id }) //find and storing school to the store
          .then(
            response => {
              this.school = response.data;
              this.loadingSchool = false;
            },
            error => {
              this.loadingSchool = false;
              this.$router.push(`/error?error=${error}`);
            }
          );
      } else {
        this.school = school;
        this.loadingSchool = false;
      }
    }
  },
  created() {
    // const id = this.schoolID;
    // this.findSchool(id);
  }
};
</script>

<style scoped>
</style>
