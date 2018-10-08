<template>
  <v-card>
    <v-card-title primary-title pa-0>
      <div class="mb-2">
            <span>
            <v-icon medium>insert_chart</v-icon>
            <span style="color: black;font-weight: bold">Description</span>
          </span>
      </div>
      <div class="text-xs-center mb-2">
        <h3 class="subheading mb-2">{{model.name}}</h3>
        <div class="caption">{{model.description}}</div>
      </div>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-title primary-title pa-0>
      <div class="mb-2">
            <span>
            <v-icon medium>location_on</v-icon>
            <span style="color: black;font-weight: bold">Address</span>
          </span>
      </div>
      <div class="text-xs-center mb-2">
        <h3 class="subheading mb-2">{{model.formattedAddress}}</h3>
      </div>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-title primary-title pa-0 v-if="model.images && model.images.length > 0">
      <div class="mb-2">
            <span>
            <v-icon medium>insert_photo</v-icon>
            <span style="color: black;font-weight: bold">Photos</span>
          </span>
      </div>
      <ImageListView :images="model.images"></ImageListView>
    </v-card-title>
  </v-card>
</template>

<script>
import ImageListView from "@/components/feedsAndBlogs/ImageListView";

export default {
  name: "DescAddressPics",
  components: { ImageListView },
  props: {
    model: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped>
</style>
