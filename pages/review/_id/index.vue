<template>
  <v-container v-if="model">
    <v-layout row wrap>
        <v-flex md8 xs12 pr-3 >
             <v-card
                flat
                dark>
                <v-layout>
                <v-flex xs8>
                    <v-card-title primary-title>
                    <div>
                        <div class="headline font-weight-bold">Ratings & Reviews</div>
                    </div>
                    </v-card-title>
                    <v-card-title primary-title>
                    <div>
                        <div class="headline">{{model.name}}</div>
                        <div>{{model.formattedAddress}}</div>
                    </div>
                    </v-card-title>
                </v-flex>
                <v-img
                    v-if="model.coverPic"
                    class="shrink ma-2"
                    contain
                    height="125px"
                    :src="model.coverPic"
                    style="flex-basis: 125px"
                ></v-img>
                </v-layout>
                <v-divider dark></v-divider>
                <v-card-actions class="pa-3">
                    <v-layout row wrap>
                        <v-flex xs6 >
                            Academics
                            <span class="grey--text text--lighten-2 caption mr-2">
                                ({{ ratingAcademics }})
                            </span>
                        </v-flex>
                        <v-flex xs6>
                            <v-rating
                                v-model="ratingAcademics"
                                background-color="white"
                                color="yellow accent-4"
                                length="10"
                                dense
                                half-increments
                                hover
                                size="24"
                            ></v-rating>
                        </v-flex>
                        <v-flex xs6 >
                            Facilities
                            <span class="grey--text text--lighten-2 caption mr-2">
                                ({{ ratingFacilities }})
                            </span>
                        </v-flex>
                        <v-flex xs6>
                            <v-rating
                                v-model="ratingFacilities"
                                background-color="white"
                                color="yellow accent-4"
                                length="10"
                                dense
                                half-increments
                                hover
                                size="24"
                            ></v-rating>
                        </v-flex>
                        <v-flex xs6 >
                            Extracurricular Activities
                            <span class="grey--text text--lighten-2 caption mr-2">
                                ({{ ratingExtracurricular }})
                            </span>
                        </v-flex>
                        <v-flex xs6>
                            <v-rating
                                v-model="ratingExtracurricular"
                                background-color="white"
                                color="yellow accent-4"
                                length="10"
                                dense
                                half-increments
                                hover
                                size="24"
                            ></v-rating>
                        </v-flex>
                    </v-layout>
                </v-card-actions>
                </v-card>
                <vue-editor placeholder='Write your review here...' v-model="content"></vue-editor>
                <ImageSelectAndPreview
                    v-if="addPhotosFlag"
                    @change-images="onChangeInImages"
                    @on-error="onError">
                </ImageSelectAndPreview>
                <AddressWithFetch
                    v-if="addLocationFlag"
                    :location="location"
                    @change-location="location = $event">
                </AddressWithFetch>
                <v-tooltip top>
                    <v-btn class="mb-3" 
                        slot="activator"
                        color="primary" 
                        @click="addPhotosFlag = !addPhotosFlag">
                        {{addPhotosBtnText}}
                    </v-btn>
                    <span>Adding photos to the review make it perfect for viewer!</span>
                </v-tooltip>
                <v-tooltip top>
                    <v-btn class="mb-3" 
                        slot="activator"
                        color="primary" 
                        @click="addLocationFlag = !addLocationFlag">
                        {{addLocationBtnText}}
                    </v-btn>
                    <span>Adding location will let us publish this review in realtime feeds to the area you want!</span>
                </v-tooltip>
               
                <v-btn class="mb-3" color="primary" 
                    :disabled="dialog"
                    :loading="dialog"
                    @click="onSaveClick">
                    Submit
                </v-btn>
                <v-card>
            </v-card>
        </v-flex>
        <v-flex md4 xs12>
            <ReviewTips></ReviewTips>
        </v-flex>
    </v-layout>
    <v-dialog
        v-model="dialog"
        persistent
        height="300"
        width="300">
        <v-card
            color="primary"
            dark>
            <v-card-text>
                <div>
                    {{dialogText}}
                </div>
                Hold on
                <v-progress-linear
                    indeterminate
                    color="white"
                    class="mb-0">
                </v-progress-linear>
            </v-card-text>
        </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import config from "@/config.js";
import axios from "axios";
import ApiEndpoints from "@/constants/ApiEndpoints";
import firebase from "firebase";
import VueEditor from '@/components/utils/VueEditor.vue'
import ImageSelectAndPreview from "@/components/utils/ImageSelectAndPreview";
import ReviewTips from "@/components/review/ReviewTips";
import AddressWithFetch from "@/components/utils/formUtil/AddressWithFetch";

export default {
    components: {
        VueEditor,
        ImageSelectAndPreview,
        ReviewTips,AddressWithFetch
    },
    middleware : "place",
    asyncData({ store, params }) {
        let educationalPlace = store.getters["school/schools"](params.id);
        return{
                model:educationalPlace
            }
    },
    head () {
        let model = this.model;
        return {
            title: `${model.name} | ${model.formattedAddress} | Submit Review`,
            meta: [
                {
                    hid: `description`,
                    name: 'description',
                    content: `${model.name} - ${model.description}`
                },
                {
                    hid: `keywords`,
                    name: 'keywords',
                    keywords: `${model.name},details,rating,reviews,education,feeds,
                        blogs,contact,facilities,extracurriculars,acitivities,blogs,reviews`        
                }
            ]
        }
    },
    data() {
        return {
            dialog: false,
            dialogText:'Submitting your review',
            addPhotosFlag:false,
            addPhotosBtnText:"Add Photos",
            addLocationFlag:false,
            addLocationBtnText:"Add Location",
            location: null,
            content:{},
            file:[],
            Editor:[],
            cursorLocation:[],
            ratingAcademics:0,
            ratingFacilities:0,
            ratingExtracurricular:0,
            reviewPublicId:null,
            imagesFile: null,
            coverPic:{},
        }
    },
    watch:{
        addPhotosFlag(val){
            if(val){
                this.addPhotosBtnText = 'Cancel Photo'
            }else{
                this.addPhotosBtnText = 'Add Photos'
            }
        },
        addLocationFlag(val){
            if(val){
                this.addLocationBtnText = 'Cancel Location'
            }else{
                this.addLocationBtnText = 'Add Location'
            }
        }
    },
    methods: {
        onChangeInImages(imagesFile) {
            this.imagesFile = imagesFile;
        },
        onError(message) {
            this.$store.dispatch("shared/setErrorText",message);
            this.$store.dispatch("shared/setErrorSnackbar",true);
        },
        onSaveClick: async function () {
            if(this.ratingAcademics === 0 || this.ratingFacilities === 0 || this.ratingFacilities===0){
                this.$store.dispatch("shared/setErrorText","Ratings cannot be empty");
                this.$store.dispatch("shared/setErrorSnackbar",true);
                return;
            }
            this.dialog = true;
            const submitReviewRequest = {
                reviewText: this.content.text,
                reviewContent : this.content.html,
                placePublicId : this.$route.params.id,
                ratingAcademics:this.ratingAcademics,
                ratingFacilities:this.ratingFacilities,
                ratingExtracurricular:this.ratingExtracurricular,
                locationDTO: this.location
            }
            console.log(submitReviewRequest);
            var formData = new FormData();
            if(this.imagesFile !== null && this.imagesFile !== undefined){
                for(var index = 0; index < this.imagesFile.length; index++) {
                    let image = await this.imagesFile[index].promisedBlob();
                    formData.append("images",image) ;
                }
            }
        
            formData.append("submitReviewRequest", JSON.stringify(submitReviewRequest));
            try {
                let idToken = this.$cookies.get('firebase-user-token');
                try {
                    let { data } = await axios.post(
                    config.baseUrl + '/api/client/review/submitReview',
                    formData, {
                    headers: {
                        'X-Authorization-Firebase': idToken,
                        'Content-Type': 'multipart/form-data'
                    }
                    });
                    this.$store.dispatch("shared/setSuccessText",data);
                    this.$store.dispatch("shared/setSuccessSnackbar",true);
                    this.$router.push("/place/" +this.$route.params.id);
                } catch (error) {
                    this.$store.dispatch("shared/setErrorText",error.response.data.message);
                    this.$store.dispatch("shared/setErrorSnackbar",true);
                }
            } catch (error) {
                this.$store.dispatch("shared/setErrorText","Please login to submit review");
                this.$store.dispatch("shared/setErrorSnackbar",true);
            }finally{
                this.dialog = false;
            }
        }
    }
}
</script>