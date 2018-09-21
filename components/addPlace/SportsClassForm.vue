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
          <v-card class="ma-2">
            <v-container fluid>
              <CategoriesAndGender
                :categories="formData.categories"
                :school-type="schoolType"
                :genders="formData.gender"
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
          <v-card class="ma-2">
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
        <v-stepper-step step="3" :complete="schoolForm > 3">Select classes</v-stepper-step>
        <v-stepper-content step="3">
          <v-card class="ma-2">
            <SubjectClasses
              :classes-type="formData.classesType"
              :classes-type-selected="classesType"
              @change-classesTypeSelected="classesType = $event"></SubjectClasses>
          </v-card>
          <v-btn color="primary" @click.native="validation">Continue</v-btn>
          <v-btn flat>Cancel</v-btn>
        </v-stepper-content>
        <v-stepper-step step="4" :complete="schoolForm > 4">Select facilities provided </v-stepper-step>
        <v-stepper-content step="4">
          <v-card class="ma-2">
            <FacilitiesLike
              entityType="Sports School"
              :facilities="formData.facilities"
              :facilities-selected="facilities"
              :extracurricular="formData.extracurricular"
              :extracurricular-selected="extracurricular"
              @change-facilitiesSelected="facilities = $event"
              @change-extracurricularSelected="extracurricular = $event"></FacilitiesLike>
          </v-card>
          <v-btn color="primary" @click.native="validation">Continue</v-btn>
          <v-btn flat>Cancel</v-btn>
        </v-stepper-content>
        <v-stepper-step step="5">Upload Photos </v-stepper-step>
        <v-stepper-content step="5">
          <v-card class="ma-2">
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
    <v-snackbar
      color="error"
      bottom
      v-model="errorSnackbar">
      {{ errorText }}
      <v-btn dark flat @click.native="errorSnackbar = false">Close</v-btn>
    </v-snackbar>
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
import SchoolFormValidation from "@/utils/SchoolFormValidation";
import Util from "../../utils/Util";
import CategoriesAndGender from "@/components/utils/formUtil/CategoriesAndGender";
import Description from "@/components/utils/formUtil/Description";
import AddressWithFetch from "@/components/utils/formUtil/AddressWithFetch";
import FacilitiesLike from "@/components/utils/formUtil/FacilitiesLike";
import MusicClassInput from "../utils/formUtil/MusicClassInput";
import EntityConstants from "../../utils/EntityConstants";
import SubjectClasses from "../utils/formUtil/SubjectClasses";

export default {
  name: "SportsClassForm",
  components: {
    SubjectClasses,
    MusicClassInput,
    FacilitiesLike,
    AddressWithFetch,
    Description,
    CategoriesAndGender,
    Address,
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
      classesType: [],
      facilities: [],
      extracurricular: [],
      imageUrl: "",
      coverPic: {},
      errorText: null,
      errorSnackbar: false,
      savingDialogue: false
    };
  },
  created() {
    /**
     * Queries on thd db to fetch school form data
     */
    db.collection("filter")
      .doc("sportsFilters")
      .get()
      .then(doc => {
        if (doc.exists) {
          this.formData = doc.data();
          console.log(this.formData);
        } else {
          this.$router.push(`/error?error=${"No such document!"}`);
        }
        this.loading = false;
      })
      .catch(error => {
        this.$router.push(`/error?error=${error}`);
      });
  },
  methods: {
    saveSchool: function(snapshot, newSchoolRef, placeType) {
      const school = {
        coverPic: snapshot.downloadURL,
        images: [snapshot.downloadURL],
        location: this.location,
        categories: Util.listToObject(this.schoolType),
        description: this.description,
        extracurricular: Util.listToObject(this.extracurricular),
        facilities: Util.listToObject(this.facilities),
        gender: Util.listToObject(this.genderList),
        classesType: Util.listToObject(this.classesType),
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
        userId: this.$store.getters.user.uid
      };
      newSchoolRef
        .set(school)
        .then(() => {
          this.savingDialogue = false;
          console.log(newSchoolRef.id);
          console.log(snapshot.downloadURL);
          console.log("Document successfully written!");
        })
        .catch(error => {
          this.errorText = "Something went wrong. Please try again";
          console.log("Error in writing doc : " + error);
          this.errorSnackbar = true;
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
    submitForm() {
      this.savingDialogue = true;
      const newSchoolRef = db.collection("schools").doc();
      this.coverPic.generateBlob(
        blob => {
          console.log(blob);
          let storageRef = firebase.storage().ref();
          storageRef
            .child("school_photos/" + newSchoolRef.id)
            .child(
              this.coverPic.getChosenFile().name + "_" + new Date().getTime()
            )
            .put(blob)
            .then(snapshot => {
              this.saveSchool(snapshot, newSchoolRef, { sportsClass: true });
            });
        },
        "image/jpeg",
        0.8
      );
    },
    validation() {
      this.errorText = null;
      this.errorSnackbar = false;
      if (this.schoolForm === 1) {
        const result = SchoolFormValidation.validateTypeAndGender(
          this.schoolType,
          this.genderList,
          EntityConstants.SPORTS_CLASS
        );
        if (result.valid) {
          this.schoolForm = 2;
        } else {
          this.errorText = result.errorText;
          this.errorSnackbar = result.errorSnackbar;
        }
      } else if (this.schoolForm === 2) {
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
          this.errorText = result.errorText;
          this.errorSnackbar = result.errorSnackbar;
        }
      } else if (this.schoolForm === 3) {
        const result = SchoolFormValidation.validateClassesType(
          this.classesType,
        );
        if (result.valid) {
          this.schoolForm = 4;
        } else {
          this.errorText = result.errorText;
          this.errorSnackbar = result.errorSnackbar;
        }
      } else if (this.schoolForm === 4) {
        const result = SchoolFormValidation.validateFacilityAndExtraCurricullar(
          [],
          this.facilities,
          this.extracurricular,
          EntityConstants.SPORTS_CLASS
        );
        if (result.valid) {
          this.schoolForm = 4;
        } else {
          this.errorText = result.errorText;
          this.errorSnackbar = result.errorSnackbar;
        }
      } else if (this.schoolForm === 5) {
        const result = SchoolFormValidation.validateCoverPicAndSubmit(
          this.coverPic
        );
        if (result.valid) {
          this.submitForm();
        } else {
          this.errorText = result.errorText;
          this.errorSnackbar = result.errorSnackbar;
        }
      }
    }
  }
};
</script>
