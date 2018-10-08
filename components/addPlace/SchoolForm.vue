<template>
  <v-layout row wrap>
    <v-flex xs12 class="text-xs-center" v-if="loading">
      <v-progress-circular
        indeterminate
        class="accent--text"
        :width="7"
        :size="70"
      ></v-progress-circular>
    </v-flex>
    <v-flex xs12 v-else>
      <v-stepper v-model="schoolForm" vertical>
        <v-stepper-step step="1" :complete="schoolForm > 1">
          Choose Category
          <small>You can select multiple</small>
        </v-stepper-step>
        <v-stepper-content step="1">
          <v-card class="ma-2" flat>
            <v-container fluid>
              <CategoriesAndGender
                :categories="formData.subCategoryNames"
                :school-type="schoolType"
                :genders="formData.genderNames"
                :gender-list="genderList"
                @change-schoolType="schoolType = $event"
                @change-genderList="genderList = $event"></CategoriesAndGender>
            </v-container>
          </v-card>
          <v-btn color="primary" @click="validation">Continue</v-btn>
          <v-btn flat>Cancel</v-btn>
        </v-stepper-content>
        <v-stepper-step step="2" :complete="schoolForm > 2">Description</v-stepper-step>
        <v-stepper-content step="2">
          <v-card class="ma-2" flat>
            <Description
              :school-name="schoolName" @change-schoolName="schoolName = $event"
              :mobile="mobile" @change-mobile="mobile = $event"
              :email="email" @change-email="email = $event"
              :website="website" @change-website="website = $event"
              :description="description" @change-description="description = $event"></Description>
            <AddressWithFetch
              :location="location"
              @change-location="location = $event"></AddressWithFetch>
          </v-card>
          <v-btn color="primary" @click="validation">Continue</v-btn>
          <v-btn flat>Cancel</v-btn>
        </v-stepper-content>
        <v-stepper-step step="3" :complete="schoolForm > 3">Select boards and classes</v-stepper-step>
        <v-stepper-content step="3">
          <v-card class="ma-2" flat>
            <BoardsAndClasses
              :boards="formData.educationalBoardNames"
              :boards-list="boards" @change-boardsList="boards = $event"
              :classes="formData.educationalClassNames"
              :classes-list="classes" @change-classesList="classes = $event"></BoardsAndClasses>
          </v-card>
          <v-btn color="primary" @click.native="validation">Continue</v-btn>
          <v-btn flat>Cancel</v-btn>
        </v-stepper-content>
        <v-stepper-step step="4" :complete="schoolForm > 4">Select facilities provided </v-stepper-step>
        <v-stepper-content step="4">
          <v-card class="ma-2" flat>
            <FacilitiesLike
              entityType="School"
              :facilities="formData.facilityNames"
              :facilities-selected="facilities"
              :special-facilities="formData.specialFacilityNames"
              :special-facilities-selected="specialFacilities"
              :extracurricular="formData.extracurricularNames"
              :extracurricular-selected="extracurricular"
              @change-specialFacilitiesSelected="specialFacilities = $event"
              @change-facilitiesSelected="facilities = $event"
              @change-extracurricularSelected="extracurricular = $event"></FacilitiesLike>
          </v-card>
          <v-btn color="primary" @click.native="validation">Continue</v-btn>
          <v-btn flat>Cancel</v-btn>
        </v-stepper-content>
        <v-stepper-step step="5">Upload Photos </v-stepper-step>
        <v-stepper-content step="5">
          <v-card class="ma-2" flat>
            <v-container>
              <p style="font-weight: bold;">Choose cover pic(image can be zoomed
                and cropped by dragging image in any direction)</p>
            </v-container>
            <v-container class="justify-center">
              <v-layout row class="justify-center">
                <croppa v-model="coverPic"
                  :width="600"
                        :height="300"
                        class="grey lighten-3"
                        placeholder="Choose Cover Pic"
                        accept="image/*"
                        :zoom-speed="5"
                        initial-position="center"
                        prevent-white-space></croppa>
              </v-layout>
            </v-container>
          </v-card>
          <v-btn color="primary" @click.stop="validation">Submit</v-btn>
          <v-btn flat>Cancel</v-btn>
        </v-stepper-content>
      </v-stepper>
    </v-flex>
    <v-dialog v-model="savingDialogue" persistent max-width="500px">
      <v-card>
        <v-card-title  class="justify-center">
          Saving your educational place!
        </v-card-title>
        <v-layout class="justify-center">
          <v-progress-circular class="mb-3" indeterminate :width="3" color="green"></v-progress-circular>
        </v-layout>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import db from "@/services/firebaseInit";
import Address from "./Address";
import firebase from "firebase";
import SchoolUtil from "../../utils/SchoolUtil";
import Util from "../../utils/Util";
import SchoolFormValidation from "@/utils/SchoolFormValidation";
import CategoriesAndGender from "@/components/utils/formUtil/CategoriesAndGender";
import Description from "@/components/utils/formUtil/Description";
import AddressWithFetch from "@/components/utils/formUtil/AddressWithFetch";
import BoardsAndClasses from "@/components/utils/formUtil/BoardsAndClasses";
import FacilitiesLike from "@/components/utils/formUtil/FacilitiesLike";
import EntityConstants from "../../utils/EntityConstants";
import config from "@/config.js";
import axios from "axios";
import ApiEndpoints from "@/constants/ApiEndpoints";

export default {
  name: "SchoolForm",
  components: {
    FacilitiesLike,
    BoardsAndClasses,
    AddressWithFetch,
    Description,
    CategoriesAndGender,
    Address
  },
  data() {
    return {
      schoolForm: 1,
      loading: true,
      formData: null,
      schoolType: [],
      genderList: [],
      schoolName: "",
      email: "",
      website: "",
      mobile: "",
      location: null,
      loadingLocation: false,
      locationError: false,
      locationErrorText: "",
      description: "",
      boards: [],
      classes: [],
      facilities: [],
      specialFacilities: [],
      extracurricular: [],
      imageUrl: "",
      coverPic: {},
      savingDialogue: false
    };
  },
  async created() {
    try {
      let idToken = this.$cookies.get('firebase-user-token');
      console.log(idToken);
      try {
        let { data } = await axios.get(config.baseUrl + ApiEndpoints.GET_FORM_DATA_FOR_SCHOOL,{
                                  headers: {'X-Authorization-Firebase': idToken},
                                  params: {
                                  categoryId: 6,
                                }
        });
        
        this.formData = data;
        this.loading = false;
      } catch (error) {
          console.log("Error inApiEndpoints.GET_FORM_DATA_FOR_SCHOOL ==>",error.response);
      }
    } catch (error) {
      console.log("Error in getting the token ==>",error);
    }
  },
  methods: {
    saveSchool: function(snapshot, newSchoolRef, placeType) {
      const school = {
        locationDTO: this.location,
        coverPic: snapshot.downloadURL,
        images: [snapshot.downloadURL],
        boards: Util.listToObject(this.boards),
        subCategories: Util.listToObject(this.schoolType),
        classes: Util.listToObject(this.classes),
        description: this.description,
        extracurricular: Util.listToObject(this.extracurricular),
        facilities: Util.listToObject(this.facilities),
        specialFacilities: Util.listToObject(this.specialFacilities),
        gender: Util.listToObject(this.genderList),
        id: newSchoolRef.id,
        mail: this.email,
        mobileNumber: this.mobile,
        website: this.website,
        name: this.schoolName,
        noOfBookmarks: 0,
        noOfRating: 0,
        placeType: placeType,
        rating: 0,
        time: new Date(),
        type: "Schools",
        userID: this.$store.getters.user.uid
      };
      newSchoolRef
        .set(school)
        .then(() => {
          this.savingDialogue = false;
        })
        .catch(error => {
          this.$store.dispatch("shared/setErrorText","Something went wrong. Please try again");
          this.$store.dispatch("shared/setErrorSnackbar",true);
        });
    },
    /**
     * Call when user clicks on the submit form
     * It collects data from different sections of the form(Steppers)
     * and save it to the collection schools
     * (code to upload the cropped image file (a file is a blob))
     * 80% compressed jpeg file
     *
     * After saving the data it takes the user to the school detail page
     */
    async submitForm() {
      this.savingDialogue = true;
      const newSchoolRef = db.collection("draft_schools").doc();
      this.coverPic.generateBlob( async blob => {
          const school = {
            locationDTO: this.location,
            boards: this.boards,
            subCategories: this.schoolType,
            classes: this.classes,
            description: this.description,
            extracurricular: this.extracurricular,
            facilities: this.facilities,
            specialFacilities: this.specialFacilities,
            gender: this.genderList,
            mail: this.email,
            mobileNumber: this.mobile,
            website: this.website,
            name: this.schoolName,
          };

          var formData = new FormData();
          formData.append("coverPic", blob);
          formData.append("schoolDetailRequest", JSON.stringify(school));
          try {
          let idToken = this.$cookies.get('firebase-user-token');
            try {
              let { data } = await axios.post(
                config.baseUrl + ApiEndpoints.POST_SCHOOL_DETAIL,
                formData, {
                headers: {
                  'X-Authorization-Firebase': idToken,
                   'Content-Type': 'multipart/form-data'
                }
              });
            } catch (error) {
                console.log("Error in ApiEndpoints.GET_FORM_DATA_FOR_SCHOOL ==>",error.response);
            }
          } catch (error) {
            console.log("Error in getting the token ==>",error);
          }

          // var formData = new FormData();
          // formData.append("coverPic", blob);
          // formData.append("schoolDetailDTO", JSON.stringify(school));
          
          // try {
          // let idToken = await firebase.auth().currentUser.getIdToken(/* forceRefresh */ true);
          // console.log(idToken);
          //   try {
          //     let { data } = await axios.post(
          //       config.baseUrl + "/api/client/addPlace/submitSchool",
          //       formData, {
          //       headers: {
          //         'X-Authorization-Firebase': idToken,
          //         'Content-Type': 'multipart/form-data'
          //       }
          //     });
          //   } catch (error) {
          //       console.log("Error inApiEndpoints.GET_FORM_DATA_FOR_SCHOOL ==>",error.response);
          //   }
          // } catch (error) {
          //   console.log("Error in getting the token ==>",error);
          // }


          // let storageRef = firebase.storage().ref();
          // storageRef
          //   .child("school_photos/" + newSchoolRef.id)
          //   .child(
          //     this.coverPic.getChosenFile().name + "_" + new Date().getTime()
          //   )
          //   .put(blob)
          //   .then(snapshot => {
          //     this.saveSchool(snapshot, newSchoolRef, placeType);
          //   });
        },
        "image/jpeg",
        1
      );
    },
    validation() {
      this.errorText = null;
      this.errorSnackbar = false;
      if (this.schoolForm === 1) {
        const result = SchoolFormValidation.validateTypeAndGender(
          this.schoolType,
          this.genderList,
          "School"
        );
        if (result.valid) {
          this.schoolForm = 2;
        } else {
          this.$store.dispatch("shared/setErrorText",result.errorText);
          this.$store.dispatch("shared/setErrorSnackbar",result.errorSnackbar);
        }
      } else if (this.schoolForm === 2) {
        console.log(this.schoolName)
        console.log(this.email)
        console.log(this.mobile)
        console.log(this.website)
        const result = SchoolFormValidation.validateDescription(
          this.schoolName,
          this.email,
          this.mobile,
          this.website,
          this.description,
          this.location
        );
        if (result.valid) {
          this.schoolForm = 3;
        } else {
          this.$store.dispatch("shared/setErrorText",result.errorText);
          this.$store.dispatch("shared/setErrorSnackbar",result.errorSnackbar);
        }
      } else if (this.schoolForm === 3) {
        const result = SchoolFormValidation.validateBoardAndClass(
          this.boards,
          this.classes
        );
        if (result.valid) {
          this.schoolForm = 4;
        } else {
          this.errorText = result.errorText;
          this.errorSnackbar = result.errorSnackbar;
        }
      } else if (this.schoolForm === 4) {
        const result = SchoolFormValidation.validateFacilityAndExtraCurricullar(
          this.specialFacilities,
          this.facilities,
          this.extracurricular
        );
        if (result.valid) {
          this.schoolForm = 5;
        } else {
          this.$store.dispatch("shared/setErrorText",result.errorText);
          this.$store.dispatch("shared/setErrorSnackbar",result.errorSnackbar);
        }
      } else if (this.schoolForm === 5) {
        const result = SchoolFormValidation.validateCoverPicAndSubmit(
          this.coverPic
        );
        if (result.valid) {
          this.submitForm();
        } else {
          this.$store.dispatch("shared/setErrorText",result.errorText);
          this.$store.dispatch("shared/setErrorSnackbar",result.errorSnackbar);
        }
      }
    }
  }
};
</script>

<style scoped>
</style>
