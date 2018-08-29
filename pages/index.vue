<template>
    <v-container fluid fill-height>
        <v-layout flex align-center justify-center>
              <v-dialog
                v-model="dialog"
                fullscreen
                hide-overlay
                persistent
                width="300">
                  <v-card
                  class="outer"
                    color="primary"
                    dark>
                    <v-card-text
                      class="justify-center text-xs-center middle">
                      <div class="inner">
                            Please stand by
                        <v-progress-linear
                          indeterminate
                          color="white"
                          class="mb-0"
                        ></v-progress-linear>                           
                      </div>
                    </v-card-text>
                  </v-card>
              </v-dialog>
        </v-layout>
    </v-container>
</template>

<script>
import axios from "axios";
import Geohash from "latlon-geohash";
import LocationUtil from "../utils/LocationUtil";
export default {
  name: "EntityList",
  data: function() {
    return {
      dialog: true
    };
  },
  created() {
    const location = this.$store.getters["location/location"];
    if (location === null || location === undefined) {
      axios.get(`http://ip-api.com/json`).then(res => {
        this.$store.dispatch("location/setIpLocation", res.data);
        const geohash150 = Geohash.encode(res.data.lat, res.data.lon, 3);
        const geohash50 = Geohash.encode(res.data.lat, res.data.lon, 4);
        const geohash5 = Geohash.encode(res.data.lat, res.data.lon, 5);
        const geohash1 = Geohash.encode(res.data.lat, res.data.lon, 6);

        const url =
          "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
          res.data.lat +
          "," +
          res.data.lon +
          "&key=AIzaSyCg9KqjmKWZOFws3MUGPdx4uPJgjlndwds";
        axios.get(url).then(loc => {
          let results = loc.data.results;
          if (results[0]) {
            let location = LocationUtil.deduceLocation(results[0]);
            location.latitude = res.data.lat;
            location.longitude = res.data.lon;
            location.geohash150 = geohash150;
            location.geohash50 = geohash50;
            location.geohash5 = geohash5;
            location.geohash1 = geohash1;
            console.log(location);
            this.$store.dispatch("location/setLocation", location);
            this.$router.push("/home");
          }
        });
      });
    } else {
      this.$router.push("/home");
    }
  },
  methods: {},
  computed: {}
};
</script>
<style>
.outer {
  display: table;
  position: absolute;
  height: 100%;
  width: 100%;
}

.middle {
  display: table-cell;
  vertical-align: middle;
}

.inner {
  margin-left: auto;
  margin-right: auto;
  width: 400px;
  /*whatever width you want*/
}
</style>

