import Geohash from "latlon-geohash";
import LocationUtil from "../utils/LocationUtil";

export default {
  state: () => ({
    location: null,
    locationError: null,
    ipLocation:null,
    loading:false
  }),
  mutations: {
    setLocation(state, payload) {
      state.location = payload;
    },
    clearLocation(state) {
      state.location = null;
    },
    setLocationError(state, payload) {
      state.locationError = payload;
    },
    clearLocationError(state) {
      state.locationError = null;
    },
    setIpLocation(state, payload){
      state.ipLocation = payload;
    },
    setLoading(state, payload) {
      state.loading = payload;
    },
  },
  actions: {
    /**
     * Fetches location by using google's place api
     * After fetching the location it store location in the store
     */
    saveLocation({ commit }, payload) {
      return new Promise((resolve, reject) => {
        const addressData = { address: payload.addressData };
        const location = LocationUtil.deduceLocation(payload.placeResultData);
        location.latitude = addressData.address.latitude;
        location.longitude = addressData.address.longitude;
        location.geohash150 = Geohash.encode(
          addressData.address.latitude,
          addressData.address.longitude,
          3
        );
        location.geohash50 = Geohash.encode(
          addressData.address.latitude,
          addressData.address.longitude,
          4
        );
        location.geohash5 = Geohash.encode(
          addressData.address.latitude,
          addressData.address.longitude,
          5
        );
        location.geohash1 = Geohash.encode(
          addressData.address.latitude,
          addressData.address.longitude,
          6
        );
        commit("setLocation", location);
        resolve({data : location});
        if(!location) {
          reject({data : "Something went wrong"});
        }
        });
      },

    /**
     * Fetches user current location
     * if user allows browser to fetch location,
     * if user do not allow browser to fetch location
     * then it will show error message
     *
     * After fetching the location it store location in the store
     */
    fetchUserLocation({ commit }) {
      return new Promise((resolve, reject) => {
        commit("setLoading", true);
        commit("clearLocationError");
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            position => {
              commit("setLoading", false);
              const geohash150 = Geohash.encode(
                position.coords.latitude,
                position.coords.longitude,
                3
              );
              const geohash50 = Geohash.encode(
                position.coords.latitude,
                position.coords.longitude,
                4
              );
              const geohash5 = Geohash.encode(
                position.coords.latitude,
                position.coords.longitude,
                5
              );
              const geohash1 = Geohash.encode(
                position.coords.latitude,
                position.coords.longitude,
                6
              );
              const geocoder = new google.maps.Geocoder();
              const latlng = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
              };
              geocoder.geocode({ location: latlng }, function(results, status) {
                if (status === "OK") {
                  if (results[0]) {
                    console.log(results[0].formatted_address);
                    console.log(results[0]);
                    let location = LocationUtil.deduceLocation(results[0]);
                    location.latitude = position.coords.latitude;
                    location.longitude = position.coords.longitude;
                    location.geohash150 = geohash150;
                    location.geohash50 = geohash50;
                    location.geohash5 = geohash5;
                    location.geohash1 = geohash1;
                    commit("setLocation", location);
                    resolve({data : location})
                  } else {
                    commit("setLoading", false);
                    commit("setLocationError", "No results found");
                    reject({data : "No results found"})
                  }
                } else {
                  commit("setLocationError", "Geocoder failed due to: " + status);
                  reject({data : "Geocoder failed due to: " + status})

                }
              });
            },
            err => {
              commit("setLoading", false);
              commit("setLocationError", err);
              reject({data : err})
            }
          );
        } else {
          commit("setLoading", false);
          commit("setLocationError", "Cannot access location.");
          reject({data : "Cannot access location."})
        }
      });
    },
    clearLocationError({ commit }) {
      commit("clearLocationError");
    },
    clearLocation({ commit }) {
      commit("clearLocation");
    },
    setIpLocation({ commit }, payload){
      commit("setIpLocation", payload);
    },
    setLocation({ commit }, payload) {
      commit("setLocation", payload);
    }
  },
  getters: {
    location(state) {
      return state.location;
    },
    locationError(state) {
      return state.locationError;
    },
    ipLocation(state){
      return state.ipLocation;
    },
    loading(state) {
      return state.loading;
    }
  }
};
























// Cell dimensions at the equatoredit
// The table below shows the metric dimensions for cells covered by various string lengths of geohash. Cell dimensions vary with latitude and so the table is for the worst-case scenario at the equator.
//
//   GeoHash length      Area width x height
//
//           1            5,009.4km x 4,992.6km
//
//           2            1,252.3km x 624.1km
//
//           3            156.5km x 156km
//
//           4            39.1km x 19.5km
//
//           5            4.9km x 4.9km
//
//           6            1.2km x 609.4m
//
//           7            52.9m x 152.4m
//
//          8             38.2m x 19m
//
//          9             4.8m x 4.8m
//
//          10            1.2m x 59.5cm
//
//          11            14.9cm x 14.9cm
//
//          12            3.7cm x 1.9cm
