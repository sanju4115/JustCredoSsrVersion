<template>
  <div class="text-xs-center">
    <v-menu
      offset-x
      :close-on-content-click="false"
      max-width="500px"
      :nudge-width="200"
      v-model="menu">
      <v-chip slot="activator" color="background" text-color="white">
        <v-avatar>
          <v-icon small>location_on</v-icon>
        </v-avatar>
        {{location}}
      </v-chip>
      <DistanceForm class="mt-4"></DistanceForm>
    </v-menu>
  </div>
</template>

<script>
import DistanceForm from "../distance/DistanceForm";
export default {
  name: "DistanceMenu",
  components: {DistanceForm},
  data: () => ({
    menu: false,
  }),
  computed:{
    location(){
      let location = this.$store.getters["location/location"];
      if(location === undefined || location === null){
              return "Choose Address";
      }
      return location.locality;
    }
  }
};
</script>

<style scoped>
</style>
