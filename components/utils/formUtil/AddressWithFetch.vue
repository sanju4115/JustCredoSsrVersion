<template>
  <v-container pa-0>
    <v-card light pa-0>
      <v-layout row wrap fluid justify-center text-xs-center>
        <v-flex xs12 md6 >
          <v-card-text>
            <v-autocomplete
              v-model="model"
              :items="items"
              :loading="isLoading"
              :search-input.sync="search"
              color="accent"
              hide-no-data
              hide-selected
              item-text="Description"
              placeholder="Start typing to Search"
              prepend-icon="search"
              return-object
            ></v-autocomplete>
          </v-card-text>
        </v-flex>
        <v-flex xs12 sm5 md3 v-if="!loadingLocation" mt-4>
          <v-btn class="justify-center" color="success" @click.stop="fetchUserLocation">Enable Location</v-btn>
        </v-flex>
        <v-flex xs12 sm5 md3 mt-4>
            <v-btn
              :disabled="!var_location"
              color="success"
              @click="var_location = null">
              Clear
              <v-icon right>highlight_off</v-icon>
            </v-btn>
        </v-flex>
        <v-flex v-if="loadingLocation" xs6 class="text-xs-center mt-1">
          <v-progress-circular
            indeterminate
            class="accent--text"
            :width="3"
            :size="30"
          ></v-progress-circular>
          <p>Fetching Location</p>
        </v-flex>
        <v-flex xs12 >
          <v-alert type="error" :value="locationError">
            {{locationErrorText}}
          </v-alert>
        </v-flex>
      </v-layout>
      <v-expand-transition>
        <Address :location="var_location" v-if="var_location"></Address>
        <!-- <small>*indicates required field</small> -->
      </v-expand-transition>
    </v-card>
  </v-container>
</template>

<script>
import Address from "@/components/addPlace/Address";
import SchoolFormValidation from "@/utils/SchoolFormValidation";
import config from "@/config.js";
import axios from "axios";
import ApiEndpoints from "@/constants/ApiEndpoints";
import firebase from "firebase";

export default {
  name: "AddressWithFetch",
  props: ["location"],
  components: { Address },
  data() {
    return {
      loadingLocation: false,
      locationError: false,
      locationErrorText: "",
      var_location: this.location,
      entries: [],
      isLoading: false,
      model: null,
      search: null,
      sessionId:null,
      idToken:null
    };
  },
  computed: {
    items () {
      return this.entries.map(entry => {
        const Description = entry.description.length > this.descriptionLimit
          ? entry.description.slice(0, this.descriptionLimit) + '...'
          : entry.description
        return  Object.assign({}, entry, { Description });
      });
    }
  },
  async created(){
    try {
        //this.idToken = await firebase.auth().currentUser.getIdToken(/* forceRefresh */ true);
        this.idToken = this.$cookies.get('firebase-user-token')
    }catch (error) {
        console.log("Error in getting the token ==>",error);
    } 
  },
  methods:{
    /**
     * Fetches user current location
     * if user allows browser to fetch location,
     * if user do not allow browser to fetch location
     * then it will show error message
     *
     * After fetching the location it store location in the location variable
     */
     fetchUserLocation() {
      this.loadingLocation = true;
      this.locationError = null;
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async position => {
          try {
            let { data } = await axios.get(
              config.baseUrl + ApiEndpoints.GET_REVERSE_GEOCODE,{
                headers: {'X-Authorization-Firebase': this.idToken},
                params: {
                  latitude: position.coords.latitude,
                  longitude:position.coords.longitude
              }
            });
            this.var_location = data;
          } catch (error) {
              this.locationErrorText = error.response.details;
              this.locationError = true;
          }finally {
            this.loadingLocation = false;
          }
        }, err => {
            this.loadingLocation = false;
            this.locationErrorText = err.message;
            this.locationError = true;
        });
        
      } else {
        this.loadingLocation = false;
        this.locationErrorText = "Cannot access location.";
        this.locationError = true;
      }
    }
  },
  watch: {
    async search (val) {
      if(val == null) return;
      if(val.length == 1) this.model = null;

      if(val.length < 3 || this.model != null) return;
      this.isLoading = true;
      this.entries = []; //clear it before loading
      try {
        let { data } = await axios.get(
          config.baseUrl + ApiEndpoints.GET_AUTOCOMPLETE_RESULTS,{
            headers: {'X-Authorization-Firebase': this.idToken},
            params: {
            query: val,
            sessionId:(this.sessionId === null) ? '' : this.sessionId
          }
        });
        this.entries = data.autocompleteList;
        this.sessionId = data.sessionId;
      } catch (error) {
          this.locationErrorText = error.response.details;
          this.locationError = true;
      }finally {
        this.isLoading = false;
      }
      
    },
    var_location(val) {
      this.$emit("change-location", val);
    },
    model(val){
      if(val == null || undefined) {
        this.var_location = null;
        return;
      }
      this.loadingLocation = true;
      axios.get(
        config.baseUrl + ApiEndpoints.GET_PLACE_DETAILS_PACE_ID,{
          headers: {'X-Authorization-Firebase': this.idToken},
          params: {
          placeId: val.placeId,
          sessionId:(this.sessionId === null) ? '' : this.sessionId
        }
      }).then( response =>{
        this.var_location = response.data;
      }).catch (error => {
          this.locationErrorText = error.response.details;
          this.locationError = true;      
      }).finally(()=>{
        this.loadingLocation = false;
      });
    }
  }
};
</script>

<style scoped>
</style>
