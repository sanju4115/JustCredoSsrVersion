<template>
  <v-container pa-0>
    <Header text="Filters"></Header>
    <v-card v-if="filters">
      <v-card-title primary-title>
        <v-container fluid v-bind="{ [`grid-list-xs`]: true }">
          <v-layout row wrap grey lighten-4 pa-2 v-if="filters.gender">
            <v-flex xs12>
              <p style="font-weight: bold">Select Gender</p>
            </v-flex>
            <v-flex
              xs6
              v-for="category in filters.gender">
              <v-checkbox :label="category.name"
                          v-model="var_gender"
                          color="primary"
                          hide-details :value="category.name"
              ></v-checkbox>
            </v-flex>
          </v-layout>
        </v-container>
        <v-container fluid v-bind="{ [`grid-list-xs`]: true }">
          <v-layout row wrap grey lighten-4 pa-2 v-if="filters.categories">
            <v-flex xs12>
              <v-select
                v-model="var_categories"
                :items="filters.categories.map(value => value.name)"
                label="Select Category"
                chips
                tags
              ></v-select>
            </v-flex>
          </v-layout>
        </v-container>
        <v-container fluid v-bind="{ [`grid-list-xs`]: true }">
          <v-layout row wrap grey lighten-4 pa-2 v-if="filters.boards">
            <v-flex xs12>
              <v-select
                v-model="var_boards"
                :items="filters.boards.map(value => value.name)"
                label="Select Board"
                chips
                tags
              ></v-select>
            </v-flex>
          </v-layout>
        </v-container>
        <v-container fluid v-bind="{ [`grid-list-xs`]: true }">
          <v-layout row wrap grey lighten-4 pa-2 v-if="filters.classes">
            <v-flex xs12>
              <v-select
                v-model="var_classes"
                :items="filters.classes.map(value => value.name)"
                label="Select Class"
                chips
                tags
              ></v-select>
            </v-flex>
          </v-layout>
        </v-container>
        <v-container fluid v-bind="{ [`grid-list-xs`]: true }">
          <v-layout row wrap grey lighten-4 pa-2 v-if="filters.dancing">
            <v-flex xs12>
              <v-select
                v-model="var_dancing"
                :items="filters.dancing.map(value => value.name)"
                label="Select Dance Style"
                chips
                tags
              ></v-select>
            </v-flex>
          </v-layout>
        </v-container>
        <v-container fluid v-bind="{ [`grid-list-xs`]: true }">
          <v-layout row wrap grey lighten-4 pa-2 v-if="filters.singing">
            <v-flex
              xs12>
              <v-select
                v-model="var_singing"
                :items="filters.singing.map(value => value.name)"
                label="Select Singing Style"
                chips
                tags
              ></v-select>
            </v-flex>
          </v-layout>
        </v-container>
        <v-container fluid v-bind="{ [`grid-list-xs`]: true }">
          <v-layout row wrap grey lighten-4 pa-2 v-if="filters.instruments">
            <v-flex
              xs12>
              <v-select
                v-model="var_instruments"
                :items="filters.instruments.map(value => value.name)"
                label="Select Instrument"
                chips
                tags
              ></v-select>
            </v-flex>
          </v-layout>
        </v-container>
        <v-container fluid v-bind="{ [`grid-list-xs`]: true }">
          <v-layout row wrap grey lighten-4 pa-2 v-if="filters.classesType">
            <v-flex xs12>
              <v-select
                v-model="var_classesType"
                :items="filters.classesType.map(value => value.name)"
                label="Select Classes Type"
                chips
                tags
              ></v-select>
            </v-flex>
          </v-layout>
        </v-container>
        <v-container fluid v-bind="{ [`grid-list-xs`]: true }">
          <v-layout row wrap grey lighten-4 pa-2 v-if="filters.facilities">
            <v-flex
              xs12>
              <v-select
                v-model="var_facilities"
                :items="filters.facilities.map(value => value.name)"
                label="Select Facilities"
                chips
                tags
              ></v-select>
            </v-flex>
          </v-layout>
        </v-container>
        <v-container fluid v-bind="{ [`grid-list-xs`]: true }">
          <v-layout row wrap grey lighten-4 pa-2 v-if="filters.extracurricular">
            <v-flex
              xs12>
              <v-select
                v-model="var_extracurricular"
                :items="filters.extracurricular.map(value => value.name)"
                label="Select Extracurricular Activities"
                chips
                tags
              ></v-select>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-title>
      <v-layout class="justify-center">
        <v-btn
          class="mb-3"
          color="secondary"
          @click.native="changeFilter">
          Apply Filter
        </v-btn>
      </v-layout>
    </v-card>
    <v-layout style="width: 100%" v-if="loadingFilters">
      <v-flex xs12 class="text-xs-center">
        <v-progress-circular
          indeterminate
          class="accent--text"
          :width="7"
          :size="70"
        ></v-progress-circular>
      </v-flex>
    </v-layout>
    <v-alert :value="true" type="error" v-if="filterError">
      {{filterError.code}}
    </v-alert>
  </v-container>
</template>

<script>
import Header from "../utils/Header";

export default {
  name: "EntityFilter",
  components: { Header },
  data: function() {
    return {
      category:null,
      var_categories:[],
      var_dancing:[],
      var_singing:[],
      var_instruments:[],
      var_classesType:[],
      var_gender:[],
      var_extracurricular:[],
      var_facilities:[],
      var_boards:[],
      var_classes:[],
      placeType:null
    };
  },
  created() {
    this.$store.dispatch("filters/storeFilters");
    this.category = this.$store.getters["categories/category"](this.$route.params.category);
    this.placeType = "placeType" + "." + this.category.key;
  },
  methods: {
    changeFilter() {
      let filterMap = new Map();
      if (this.var_categories.length > 0) {
        filterMap.set("categories",this.var_categories);
      }
      if (this.var_dancing.length > 0) {
        filterMap.set("dancing",this.var_dancing);
      }
      if (this.var_singing.length > 0) {
        filterMap.set("singing",this.var_singing);
      }
      if (this.var_instruments.length > 0) {
        filterMap.set("instruments",this.var_instruments);
      }
      if (this.var_classesType.length > 0) {
        filterMap.set("classesType",this.var_classesType);
      }
      if (this.var_gender.length > 0) {
        filterMap.set("gender",this.var_gender);
      }
      if (this.var_extracurricular.length > 0) {
        filterMap.set("extracurricular",this.var_extracurricular);
      }
      if (this.var_facilities.length > 0) {
        filterMap.set("facilities",this.var_facilities);
      }if (this.var_boards.length > 0) {
        filterMap.set("boards",this.var_boards);
      }if (this.var_classes.length > 0) {
        filterMap.set("classes",this.var_classes);
      }
      console.log(filterMap);
      this.$emit("change-filter",filterMap);
    }
  },
  computed: {
    filters() {
      if (this.category.key === "musicClass") {
        return this.$store.getters["filters/filter"]("musicFilters");
      } else if (this.category.key === "artClass") {
        return this.$store.getters["filters/filter"]("artFilters");
      } else if (this.category.key === "sportsClass") {
        return this.$store.getters["filters/filter"]("sportsFilters");
      } else if (this.category.key === "coachingClass") {
        return this.$store.getters["filters/filter"]("coachingFilters");
      } else if (this.category.key === "artClass") {
        return this.$store.getters["filters/filter"]("musicFilters");
      } else if (this.category.key.includes("School")) {
        return this.$store.getters["filters/filter"]("schoolFilters");
      }
    },
    loadingFilters() {
      return this.$store.getters["filters/loadingFilter"];
    },
    filterError() {
      return this.$store.getters["filters/filterError"];
    }
  }
};
</script>

<style scoped>
  .nestedScroll {
    overflow: auto;
    height: 300px;
    display: block;
  }

</style>
