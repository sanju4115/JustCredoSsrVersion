<template>
<!-- <v-card> -->
  <v-layout row wrap id="imageList">
    <v-flex lg5 md5 sm5 xs12 pa-2 v-for="(i,index) in numberOfImage" :key="index">
      <croppa ref="pictureInput"
        :width="250"
        :height="250"
        accept="image/*"
        :zoom-speed="5"
        placeholder="Add Photos"
        placeholder-color="#FFF"
        :placeholder-font-size="16"
        canvas-color="teal"
        initial-position="center"
        @new-image="onChange"
        @image-remove="onRemove">
        <!-- <img slot="placeholder"
         src="/images/util/choose_image.png"> -->
        </croppa>
    </v-flex>
  </v-layout>
<!-- </v-card> -->
</template>

<script>
export default {
  name: "ImageSelectAndPreview",
  components: {},
  data () {
    return {
      pictureInput:{},
      numberOfImage:1
    }
  },
  methods:{
    onChange () {
      if (this.pictureInput) {
        console.log(this.$refs.pictureInput);
        this.numberOfImage++;
        this.$emit("change-images", this.$refs.pictureInput);
      } else {
        this.$emit("on-error", "Browser not supported.");
      }
    },
    onRemove(){
      let list = document.getElementById("imageList");   // Get the <ul> element with id="myList"
            console.log(list);
      console.log(list.childNodes);
      let emptyFound = false;
      let count = 0;
      this.$refs.pictureInput.forEach(PictureInput => {
        if (!PictureInput.hasImage()) {
          if (emptyFound === false) {
            emptyFound = true;
          }else {
            list.removeChild(list.childNodes[count]);  
          }
        }
        count++;
      });
      this.$emit("change-images", this.$refs.pictureInput);
    }
  }
};
</script>

<style scoped>
</style>
