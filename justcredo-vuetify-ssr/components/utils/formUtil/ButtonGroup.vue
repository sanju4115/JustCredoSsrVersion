<template>
  <v-layout row wrap>
    <v-tabs
      v-model="distanceBtn"
      color="light-blue"
      dark
      slider-color="colorPrimaryText"
      @input="distanceTabChange">
      <v-tab
        active-class="light-blue darken-4"
        v-for="(button, i) in buttonsKeys"
        :key="i"
        ripple>
        {{button.text}}
      </v-tab>
    </v-tabs>
  </v-layout>
</template>

<script>
import LocationUtil from "../../../utils/LocationUtil";

export default {
  name: "ButtonGroup",
  props: {
    buttonsKeys: {
      type: Array,
      required: true
    },
    selectedKey: {
      type: String,
      required: true
    }
  },
  data: () => ({
    distanceBtn:null
  }),
  mounted(){
    this.distanceBtn = 2;
  },
  methods:{
    distanceTabChange(e){
      this.$store.dispatch("shared/areaChange", { area: this.buttonsKeys[e].value });
    }
  },
  computed:{
    range(){
      return this.$store.getters["shared/areaSelected"];
    }
  }
};
</script>

<style scoped>
</style>
