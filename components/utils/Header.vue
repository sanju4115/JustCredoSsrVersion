<template>
  <v-subheader
    style="height: 5.7vh;"
    class="indicatorColor colorPrimaryText--text justify-center">
    {{text}}
  </v-subheader>
</template>

<script>
export default {
  name: "Header",
  props: {
    text: {
      type: String,
      required: true
    }
  }
};
</script>

<style scoped>
</style>
