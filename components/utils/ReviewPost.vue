<template>
  <v-container class="colorPrimaryText mb-2">
    <v-layout row wrap>
      <v-flex xs12 pa-2>
        <v-list class="pl-2">
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <img :src="model.coverPic" >
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>{{model.name}}</v-list-tile-title>
            </v-list-tile-content>
            <v-spacer></v-spacer>
            <v-btn
              v-if="!blogForm"
              @click="blogForm = true"
              dark
              color="secondary">
              Write Blog
            </v-btn>
            <v-btn
              v-if="blogForm"
              @click="onBlogCancel"
              dark
              color="secondary">
              Cancel
            </v-btn>
          </v-list-tile>
        </v-list>
      </v-flex>
      <v-flex xs12 pl-3 pr-3>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-layout row wrap v-if="blogForm">
            <v-flex>
              <v-card color="grey lighten-4" flat>
                <v-card-text>
                  <v-subheader>Start Writing Blog Here</v-subheader>
                  <v-text-field
                    :rules="headingRules"
                    v-model="heading"
                    box
                    label="Heading"
                    hint="Give heading to your blog"
                    persistent-hint
                  ></v-text-field>
                  <v-text-field
                    :rules="detailsRules"
                    name="blog"
                    v-model="blog"
                    label="Details"
                    textarea
                  ></v-text-field>
                </v-card-text>
              </v-card>
            </v-flex>
            <v-flex xs12 pl-3 pr-3>
              <v-layout row wrap mt-2>
                <ImageSelectAndPreview
                  @change-images="onChangeInImages"
                  @on-error="onError"></ImageSelectAndPreview>
              </v-layout>
            </v-flex>
            <v-flex xs12 class="text-xs-right" pr-2>
              <v-btn
                :loading=uploading
                @click="post"
                dark
                color="secondary">
                Post
              </v-btn>
            </v-flex>
          </v-layout>
        </v-form>
      </v-flex>
      <v-snackbar
        color="error"
        bottom
        v-model="errorSnackbar">
        {{ errorText }}
        <v-btn dark flat @click.native="errorSnackbar = false">Close</v-btn>
      </v-snackbar>
      <v-snackbar
        color="success"
        bottom
        v-model="successSnackBar">
        {{successText}}
        <v-btn dark flat @click.native="successSnackBar = false">Close</v-btn>
      </v-snackbar>
    </v-layout>
  </v-container>
</template>

<script>
import ImageSelectAndPreview from "../utils/ImageSelectAndPreview";
import firebase from "firebase";
import db from "../../services/firebaseInit";
export default {
  name: "ReviewPost",
  components: { ImageSelectAndPreview },
  props: {
    model: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    errorText: null,
    errorSnackbar: false,
    successSnackBar: false,
    successText: null,
    blogForm: false,
    valid: true,
    heading: null,
    blog: null,
    imagesFile: null,
    uploading: false,
    headingRules: [
      v => {
        return !!v || "Heading is required";
      }
    ],
    detailsRules: [
      v => {
        return !!v || "Detail is required";
      }
    ]
  }),
  methods: {
    onChangeInImages(imagesFile) {
      console.log(imagesFile);
      this.imagesFile = imagesFile;
    },
    post() {
      if (this.$refs.form.validate()) {
        const photosPromise = [];
        if (this.imagesFile !== null && this.imagesFile !== undefined) {
          let storageRef = firebase
            .storage()
            .ref()
            .child("school_blogs/" + this.model.id);
          this.uploading = true;
          this.imagesFile.forEach(PictureInput => {
            if (PictureInput.file !== null && PictureInput.file !== undefined) {
              const photoPromise = storageRef
                .child(PictureInput.file.name + "_" + new Date().getTime())
                .put(PictureInput.file);
              photosPromise.push(photoPromise);
            }
          });
        }
        Promise.all(photosPromise)
          .then(snapshots => {
            const imagesURL = [];
            snapshots.forEach(snapshot => {
              imagesURL.push(snapshot.downloadURL);
            });
            const batch = db.batch();
            const blogRef = db.collection("blogs").doc();
            const blogDetailRef = db.collection("blog_detail").doc(blogRef.id);
            const blog = {
              id: blogRef.id,
              userID: this.$store.getters.user.uid,
              imagesList: imagesURL,
              heading: this.heading,
              detail: this.blog,
              timestamp: new Date(),
              schoolID: this.model.id,
              location: this.$store.getters.location,
              placeType: this.model.placeType
            };
            const blogDetail = {
              id: blogRef.id,
              userID: this.$store.getters.user.uid,
              timestamp: new Date(),
              schoolID: this.model.id
            };
            batch.set(blogRef, blog);
            batch.set(blogDetailRef, blogDetail);
            batch
              .commit()
              .then(() => {
                this.successText = "Blog Posted Successfully";
                this.successSnackBar = true;
                this.uploading = false;
                this.onBlogCancel();
              })
              .catch(error => {
                this.uploading = false;
                this.errorText = "Unknown error occurred";
                this.errorSnackbar = true;
                console.log(error);
              });
          })
          .catch(error => {
            this.uploading = false;
            this.errorText = "Unknown error occurred";
            this.errorSnackbar = true;
            console.log(error);
          });
      }
    },
    onBlogCancel() {
      this.blogForm = false;
      this.heading = "";
      this.blog = "";
    },
    onError(message) {
      this.errorText = message;
      this.errorSnackbar = true;
    }
  }
};
</script>

<style scoped>
</style>
