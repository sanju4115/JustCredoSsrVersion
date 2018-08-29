<template>
  <v-container colorPrimaryText>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card class="elevation-0">
          <h1 class="title"> Currently searching with {{range}} range.</h1>
          <p class="heading mt-2"> Change search range below!</p>
          <ButtonGroup :buttons-keys="distances" selected-key="Within 5 kms"></ButtonGroup>
        </v-card>
      </v-flex>
      <v-flex xs12 mt-3>
        <PlaceLocation></PlaceLocation>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import ButtonGroup from "../utils/formUtil/ButtonGroup";
import PlaceLocation from "./PlaceLocation";
import LocationUtil from "../../utils/LocationUtil";
export default {
  name: "DistanceForm",
  components: { PlaceLocation, ButtonGroup },
  data: () => ({
    distances: [
      {
        text: "1 kms",
        value: "geohash1"
      },
      {
        text: "5 kms",
        value: "geohash5"
      },
      {
        text: "50 kms",
        value: "geohash50"
      },
      {
        text: "150 kms",
        value: "geohash150"
      }
    ]
  }),
  computed: {
    range() {
      const selectedArea = this.$store.getters["shared/areaSelected"];
      return LocationUtil.getGeoHashValueMap().get(selectedArea);
    }
  }
};
</script>

<style scoped>
</style>
