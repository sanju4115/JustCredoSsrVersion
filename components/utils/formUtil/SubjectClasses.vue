<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 v-if="classesType">
        <v-select
          v-model="var_classesTypeSelected"
          label="Select type of classes or create a new ones"
          chips
          tags
          :items="classesType.map(value => value.name)"
        ></v-select>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "SubjectClasses",
  props: {
    classesTypeSelected: {
      type: Array,
      required: true
    },
    classesType: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      var_classesTypeSelected: this.classesTypeSelected
    };
  },
  watch: {
    var_classesTypeSelected(val) {
      this.$emit("change-classesTypeSelected", val);
    }
  }
};
</script>

<style scoped>
</style>
