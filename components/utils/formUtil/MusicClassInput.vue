<!--This component cab used as getting input from the input
    about type of dance, singing and instruments-->
<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12>
        <v-select
          v-model="danceClassSelected"
          label="Select dance genres or create a new ones"
          chips
          tags
          :items="danceClass.map(value => value.name)"
        ></v-select>
      </v-flex>
      <v-flex xs12>
        <v-select
          v-model="singingClassSelected"
          label="Select singing genres or create a new ones"
          chips
          tags
          :items="singingClass.map(value => value.name)"
        ></v-select>
      </v-flex>
      <v-flex xs12>
        <v-select
          v-model="instrumentsClassSelected"
          label="Select instruments or create new one"
          chips
          tags
          :items="instrumentsClass.map(value => value.name)"
        ></v-select>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "MusicClassInput",
  props: {
    danceClass: {
      type: Array,
      required: true
    },
    singingClass: {
      type: Array,
      required: true
    },
    instrumentsClass: {
      type: Array,
      required: true
    },
    danceClassSelected: {
      type: Array,
      required: true
    },
    singingClassSelected: {
      type: Array,
      required: true
    },
    instrumentsClassSelected: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      var_danceClassSelected: this.danceClassSelected,
      var_singingClassSelected: this.singingClassSelected,
      var_instrumentsClassSelected: this.instrumentsClassSelected
    };
  },
  watch: {
    var_specialFacilitiesSelected(val) {
      this.$emit("change-danceClass", val);
    },
    var_facilitiesSelected(val) {
      this.$emit("change-singingClass", val);
    },
    var_extracurricularSelected(val) {
      this.$emit("change-instrumentsClass", val);
    }
  }
};
</script>

<style scoped>
</style>
