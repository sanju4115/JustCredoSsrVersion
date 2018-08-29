<template>
  <v-container fluid grid-list-sm class="justify-center pa-0">
    <v-subheader
      class="colorPrimaryText--text subheading primary mb-5" style="width: fit-content"
      v-if="heading" >Top {{category.name}} <v-icon dark class="ml-2">keyboard_arrow_right</v-icon></v-subheader>
    <v-layout style="width: 100%" v-if="loading">
      <v-flex xs12 class="text-xs-center">
        <v-progress-circular
          indeterminate
          class="accent--text"
          :width="7"
          :size="70"
        ></v-progress-circular>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex style="cursor: pointer;" xs6 sm4 md3 pr-2 v-for="school in schools" :key="school.id" @click="onClickSchool(school.id)">
        <School :school="school"></School>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import School from "./place/School";
export default {
  name: "TopCategoryWise",
  components: { School },
  props: {
    category: {
      type: Object,
      required: true
    }
  },
  data: function() {
    return {
      heading: false,
      loading: true,
      schools: [],
      schoolsForStoring: []
    };
  },
  created() {
    this.schools = this.$store.getters[`school/${this.category.key}`];
    this.loading = false;
    if (this.schools.length > 0) {
      this.heading = true;
    }
  },
  methods: {
    onClickSchool(id) {
      this.$router.push("/place/" + id);
    }
  }
};
</script>

<style scoped>
</style>
