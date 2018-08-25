<template>
  <v-layout row wrap>
    <v-flex xs4 v-for="i in numberOfImage">
      <picture-input
        ref="pictureInput"
        width="200"
        height="200"
        margin="16"
        accept="image/*"
        size="10"
        :zIndex=0
        :crop="false"
        button-class="btn"
        :custom-strings="{
        change: 'Change', // Text only
        remove: 'Remove', // Text only
        drag: 'Add Photo', // HTML allowed
        }"
        @change="onChange"
        @remove="onRemove"
        :removable="true">
      </picture-input>
    </v-flex>
  </v-layout>

</template>

<script>
import PictureInput from "vue-picture-input";
export default {
  name: "ImageSelectAndPreview",
  components: {
    PictureInput,
  },
  data () {
    return {
      pictureInput:null,
      numberOfImage:1
    }
  },
  methods:{
    onChange (image) {
      if (image) {
        console.log(this.$refs.pictureInput);
        this.numberOfImage++;
        this.$emit("change-images", this.$refs.pictureInput);
      } else {
        this.$emit("on-error", "Browser not supported.");
      }
    },
    onRemove(){
      let emptyFound = false;
      this.$refs.pictureInput.forEach(PictureInput => {
        if (PictureInput.file === null || PictureInput.file === undefined) {
          if (emptyFound === false) {
            emptyFound = true;
          }else {
            this.numberOfImage--;
          }
        }
      });
      this.$emit("change-images", this.$refs.pictureInput);
    }
  }
};
</script>

<style scoped>
</style>
