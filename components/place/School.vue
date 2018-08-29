<template>
  <v-card hover color="primary--text" class="ma-1">
      <v-img
        :src="school.coverPic === null ? altImage : school.coverPic"
        height="150px"
        :lazy-src="school.coverPic === null ? altImage : school.coverPic">
      <v-layout
          slot="placeholder"
          fill-height
          align-center
          justify-center
          ma-0>
          <v-progress-circular indeterminate color="primary lighten-5"></v-progress-circular>
        </v-layout>
      </v-img>
    <v-card-title primary-title class="pa-2">
      <v-chip small color="light-blue darken-4" text-color="white">
        {{school.rating}}
        <v-icon right>star</v-icon>
      </v-chip>

      <v-icon medium color="teal darken-2">location_on</v-icon>
      <span v-if="distance">{{distance}}</span>
      <div class="truncate mt-1">
        <span class="body-2">{{school.name}}</span><br>
        <span class="colorSecondaryText--text" style="color: black">{{school.location.formatted_address}}</span>
      </div>
    </v-card-title>
    <v-card-actions>
      <v-btn flat color="light-blue darken-4" router :to="`/place/${school.id}`">Details</v-btn>
      <v-btn flat color="orange">Bookmark</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import LocationUtil from "../../utils/LocationUtil";
import images from "@/constants/images";

export default {
  name: "School",
  props: ["school"],
  data: function() {
    return {
      distance: null,
      altImage: images.NO_COVER
    };
  },
  created() {
    const currentLocation = this.$store.getters["location/location"];
    const schoolLocation = this.school.location;
    if (
      currentLocation !== null &&
      currentLocation !== undefined &&
      schoolLocation !== null &&
      schoolLocation !== undefined
    ) {
      this.distance = LocationUtil.convertKmToUserReadableDist(
        LocationUtil.distanceBtwnTwoLatLng(
          currentLocation.latitude,
          currentLocation.longitude,
          schoolLocation.latitude,
          schoolLocation.longitude,
          "K"
        )
      );
    }
  },
  mounted() {}
};
</script>

<style scoped>
.truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 12px;
  font-weight: bold;
}
.hidden {
  opacity: 0;
}
.visible {
  opacity: 1;
}
a:hover {
  text-decoration: none !important;
}
</style>
