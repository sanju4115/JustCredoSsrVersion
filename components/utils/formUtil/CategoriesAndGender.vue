e<template>
  <v-layout row wrap class="pa-4">
    <v-flex xs6 sm4 md4 v-if="categories && categories.length > 0">
      <p>Select Type</p>
      <v-checkbox v-for="(category, index) in categories"
                  :key="index"
                  :label="category"
                  v-model="var_schoolType"
                  color="accent"
                  hide-details :value="category"
      ></v-checkbox>
    </v-flex>
    <v-flex xs6 sm4 md4 class="justify-center" v-if="genders && genders.length > 0">
      <p >Select Gender</p>
      <v-checkbox v-for="(gender, index) in genders"
                  :key="index"
                  :label="gender"
                  v-model="var_genderList"
                  color="accent"
                  hide-details :value="gender"
      ></v-checkbox>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: "CategoriesAndGender",
  props: {
    categories: {
      type: Array,
      required: false,
      default:function () {
        return [];
      }
    },
    genders: {
      type: Array,
      required: true
    },
    genderList: {
      type: Array,
      required: true
    },
    schoolType: {
      type: Array,
      required: true
    }
  },
  created() {
      this.var_categories = this.categories;
      this.var_genders = this.genders;
      this.var_genderList = this.genderList;
      this.var_schoolType = this.schoolType;
  },
  data() {
    return {
      var_categories: '',
      var_genders: '',
      var_genderList: '',
      var_schoolType: '',
    };
  },
  watch: {
    var_schoolType(val) {
      this.$emit("change-schoolType", val);
    },
    var_genderList(val) {
      this.$emit("change-genderList", val);
    }
  }
};
</script>

<style scoped>
</style>
