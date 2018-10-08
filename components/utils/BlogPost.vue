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
        <v-layout row wrap v-if="blogForm">
            <v-flex>
              <vue-editor placeholder='Write your content here...' v-model="content"></vue-editor>
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
        <!-- <v-form ref="form" v-model="valid" lazy-validation>
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
        </v-form> -->
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
import config from "@/config.js";
import axios from "axios";
import ApiEndpoints from "@/constants/ApiEndpoints";
import ImageSelectAndPreview from "@/components/utils/ImageSelectAndPreview";
import firebase from "firebase";
import db from "@/services/firebaseInit";
import VueEditor from '@/components/utils/VueEditor.vue';


export default {
  name: "BlogPost",
  components: { ImageSelectAndPreview, VueEditor },
  props: {
    model: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    content:{},
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
    async post() {
      if(!this.content || !this.content.text || !this.content.html){
                this.$store.dispatch("shared/setErrorText","Content cannot be empty");
                this.$store.dispatch("shared/setErrorSnackbar",true);
                return;
      }
      this.$store.dispatch("shared/setDialogText", "Submitting Blog");
      this.$store.dispatch("shared/setDialog", true);
      const submitBlogRequest = {
          blogText: this.content.text,
          blogContent : this.content.html,
          placePublicId : this.$route.params.id,
      }
      console.log(submitBlogRequest);
      var formData = new FormData();
      if(this.imagesFile !== null && this.imagesFile !== undefined){
          for(var index = 0; index < this.imagesFile.length; index++) {
              let image = await this.imagesFile[index].promisedBlob();
              formData.append("images",image) ;
          }
      }
  
      formData.append("submitBlogRequest", JSON.stringify(submitBlogRequest));
      let idToken = this.$cookies.get('firebase-user-token');
      if(idToken) {
        try {
            let { data } = await axios.post(
            config.baseUrl + ApiEndpoints.SUBMIT_BLOG,
            formData, {
            headers: {
                'X-Authorization-Firebase': idToken,
                'Content-Type': 'multipart/form-data'
            }
            });
            this.$store.dispatch("shared/setSuccessText",data);
            this.$store.dispatch("shared/setSuccessSnackbar",true);
        } catch (error) {
            this.$store.dispatch("shared/setErrorText",error.response.data.message);
            this.$store.dispatch("shared/setErrorSnackbar",true);
        }
        finally{
          this.$store.dispatch("shared/setDialog", false);       
          this.$store.dispatch("shared/setDialogText", "");
        }
      } else {
          this.$store.dispatch("shared/setErrorText","Please login to submit blog");
          this.$store.dispatch("shared/setErrorSnackbar",true);
      }
      // if (this.$refs.form.validate()) {
      //   const photosPromise = [];
      //   if (this.imagesFile !== null && this.imagesFile !== undefined) {
      //     let storageRef = firebase
      //       .storage()
      //       .ref()
      //       .child("school_blogs/" + this.model.id);
      //     this.uploading = true;
      //     this.imagesFile.forEach(PictureInput => {
      //       if (PictureInput.file !== null && PictureInput.file !== undefined) {
      //         const photoPromise = storageRef
      //           .child(PictureInput.file.name + "_" + new Date().getTime())
      //           .put(PictureInput.file);
      //         photosPromise.push(photoPromise);
      //       }
      //     });
      //   }
      //   Promise.all(photosPromise)
      //     .then(snapshots => {
      //       const imagesURL = [];
      //       snapshots.forEach(snapshot => {
      //         imagesURL.push(snapshot.downloadURL);
      //       });
      //       const batch = db.batch();
      //       const blogRef = db.collection("blogs").doc();
      //       const blogDetailRef = db.collection("blog_detail").doc(blogRef.id);
      //       const blog = {
      //         id: blogRef.id,
      //         userID: this.$store.getters.user.uid,
      //         imagesList: imagesURL,
      //         heading: this.heading,
      //         detail: this.blog,
      //         timestamp: new Date(),
      //         schoolID: this.model.id,
      //         location: this.$store.getters.location,
      //         placeType: this.model.placeType
      //       };
      //       const blogDetail = {
      //         id: blogRef.id,
      //         userID: this.$store.getters.user.uid,
      //         timestamp: new Date(),
      //         schoolID: this.model.id
      //       };
      //       batch.set(blogRef, blog);
      //       batch.set(blogDetailRef, blogDetail);
      //       batch
      //         .commit()
      //         .then(() => {
      //           this.successText = "Blog Posted Successfully";
      //           this.successSnackBar = true;
      //           this.uploading = false;
      //           this.onBlogCancel();
      //         })
      //         .catch(error => {
      //           this.uploading = false;
      //           this.errorText = "Unknown error occurred";
      //           this.errorSnackbar = true;
      //           console.log(error);
      //         });
      //     })
      //     .catch(error => {
      //       this.uploading = false;
      //       this.errorText = "Unknown error occurred";
      //       this.errorSnackbar = true;
      //       console.log(error);
      //     });
      // }
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
