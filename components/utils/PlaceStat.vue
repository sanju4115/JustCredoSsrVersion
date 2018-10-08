<template>
  <v-card :color="color" hover class="white--text">
    <v-card-title primary-title>
      <v-layout style="width: 100%" v-if="loading">
        <v-flex xs12 class="text-xs-center">
          <v-progress-circular
            indeterminate
            class="accent--text"
            :width="3"
            :size="30"
          ></v-progress-circular>
        </v-flex>
      </v-layout>
      <v-layout row wrap v-else>
        <v-flex xs12>
          <span class="pa-2">
            <v-icon x-large dark>{{icon}}</v-icon>
            <span style="font-weight: 500;font-size: 2.4vh;padding-top: 15px">{{totalCount}}</span>
          </span>
        </v-flex>
        <v-flex xs12>
          <div class="subheading pl-2">{{text}}</div>
        </v-flex>
      </v-layout>
    </v-card-title>
  </v-card>
</template>

<script>
  export default {
  name: "PlaceStat",
    props: {
      totalCount: {
        type: Number,
        required: true
      },
      text: {
        type: String,
        required: true
      },
      loading: {
        type: Boolean,
        required: true
      },
      color: {
        type: String,
        required: true
      },
      icon: {
        type: String,
        required: true
      }
    },
    data() {
      return {
      };
    },
    watch: {
    }
};
</script>

<style scoped>
</style>
