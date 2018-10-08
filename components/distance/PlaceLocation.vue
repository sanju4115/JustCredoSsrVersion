<template>
  <v-card class="grey darken-4" dark>
    <v-card-title primary-title>
      <div>
        <h3 class="headline mb-0">Enter Location Where You Want To Explore</h3>
        <div>This help us in showing you contents <br>in near by your location.</div>
      </div>
    </v-card-title>
    <!-- <VuetifyGoogleAutocomplete
      id="map"
      append-icon="search"
      solo inverted dark
      types='(cities)'
      placeholder="Search Address"
      v-on:placechanged="getAddressData"
      country="in">
    </VuetifyGoogleAutocomplete> -->
    <v-layout align-center text-xs-center row wrap>
      <v-flex xs12 sm12 text-xs-center>
        <div>
          <v-btn class="justify-center" color="success" @click.stop="fetchUserLocation">Enable Location & Start</v-btn>
        </div>
      </v-flex>
      <v-flex v-if="loading" xs12 sm12 class="text-xs-center">
        <v-progress-circular
          indeterminate
          class="background--text"
          :width="7"
          :size="30"
        ></v-progress-circular>
        <p>Fetching Location</p>
      </v-flex>
    </v-layout>
    <v-container>
      <v-layout row v-if="locationError">
        <v-flex>
          <app-alert-error @dismissed="onDismissedLocationError" :text="locationError.message"></app-alert-error>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: "PlaceLocation",
  components: {  },
  methods: {
    /**
     * Fetches location by using google's place api
     * After fetching the location it store location in the store
     */
    // getAddressData: function(addressData, placeResultData) {
    //   if (
    //     addressData !== null &&
    //     addressData !== undefined &&
    //     placeResultData !== null &&
    //     placeResultData !== undefined
    //   ) {
    //     console.log("location changed to==>", addressData, placeResultData);
    //     this.$store
    //       .dispatch("location/saveLocation", {
    //         addressData: addressData,
    //         placeResultData: placeResultData
    //       })
    //       .then(
    //         response => {
    //           this.$emit("locationSaved");
    //           this.$router.push("/loader");
    //         },
    //         error => {
    //           console.error(error);
    //         }
    //       );
    //   }
    //},
    onClose() {
      this.$emit("closeLocationPopup");
    },
    /**
     * Fetches user current location
     * if user allows browser to fetch location,
     * if user do not allow browser to fetch location
     * then it will show error message
     *
     * After fetching the location it store location in the store
     */
    fetchUserLocation() {
      this.$store.dispatch("location/fetchUserLocation").then(
        response => {
          this.$emit("locationSaved");
          this.$router.push("/loader");
        },
        error => {
          console.error(error);
        }
      );
    },
    onDismissedLocationError() {
      this.$store.dispatch("location/clearLocationError");
    }
  },
  computed: {
    locationError() {
      return this.$store.getters["location/locationError"];
    },
    loading() {
      return this.$store.getters["location/loading"];
    },
    location() {
      const location = this.$store.getters["location/location"]
      this.$cookies.set("location", location);
      return location;
    }
  }
};
</script>

<style scoped>
</style>
