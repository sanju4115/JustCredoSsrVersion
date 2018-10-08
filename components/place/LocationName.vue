<template>
    <v-hover>
        <v-card
            slot-scope="{ hover }"
            :class="`elevation-${hover ? 12 : 2}`"
            class="mx-auto mt-3"
            width="250">
            <v-img
                v-if="showImage"
                :aspect-ratio="12/6"
                src="https://cdn.vuetifyjs.com/images/cards/cooking.png">
            </v-img>
            <v-card-title>
                <div class="truncate mt-1">
                    <span class="subheading">{{locality.name}}</span>
                </div>
                <v-spacer></v-spacer>
                <v-btn icon class="mr-0" :to="baseRoute+locality.publicId">
                <v-icon dark>chevron_right</v-icon>
                </v-btn>
            </v-card-title>
        </v-card>
    </v-hover>
</template>

<script>
export default {
  name: "LocationName",
  props:{
    locality: {
      type: Object,
      required: true
    },
    showImage:{
      type: Boolean,
      required: true
    },
    baseRoute:{
        type: String,
        required:true
    } 
  },
  data: () => ({
  }),
};
</script>

<style>
.truncate {
  white-space: nowrap;
  width: 160px;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 12px;
  font-weight: bold;
}
</style>
