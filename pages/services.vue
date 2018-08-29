<template>
  <v-container fluid pa-0>
    <v-img
      :src="SERVICES_BANNER"
      height="480"
      :lazy-src="LAZY_LOADING_IMAGE">
      <v-container fill-height class="align-center">
      <div style="background: rgba(0, 0, 0, 0.5)">
        <v-layout row wrap class="pa-3 text-xs-center justify-center">
          <v-flex xs12>
            <v-layout align-center fill-height row wrap class="pa-3 mt-3 justify-center">
              <v-flex xs6 >
                <div>
                  <div>
                    <h2 class="section-title colorPrimaryText--text">JustCredo is the <span>next generation</span> educational networking</h2>
                  </div>
                </div>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex xs12 sm6>
            <div id="services">
              <p class="section-intro colorPrimaryText--text">
                We are transforming the way end users and educational
                institute used to interact with each other by creating a
                digital ecosystem where they can interact with each other directly.
              </p>
            </div>
          </v-flex>
        </v-layout>
      </div>
      </v-container>
    </v-img>
    <v-layout row wrap>
      <v-flex xs12 class="mt-5 text-xs-center justify-center">
        <v-card dark class="transparent featureBox primary--text elevation-0">
          <div>
            <h2 class="section-title">For End Users We Offers A Wide Range Of <span>Features</span></h2>
            <p class="section-intro">It acts as a educational networking and central platform for educational institutes, teachers, students and parents who are linked to education in any way.</p>
          </div>
        </v-card>
      </v-flex>

      <v-flex xs12 mb-5 mt-5>
        <alpha-card-feature :features="featureBox1" />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import images from "../constants/images";
import AlphaCardFeature from "../components/utils/formUtil/AlphaCardFeature";

export default {
  name: "services",
  components: { AlphaCardFeature },
  middleware: "about",
  data() {
    return {
      show: "false",
      dialog: false,
      homebanner: images.HOME_BANNER,
      B2B_SERVICES: images.B2B_SERVICES,
      CLASSROOM_BANNER: images.CLASSROOM_BANNER,
      MISSION_1: images.MISSION_1,
      MISSION_2: images.MISSION_2,
      FOOTER_1: images.FOOTER_1,
      SERVICES_BANNER: images.SERVICES_BANNER,
      LAZY_LOADING_IMAGE: images.LAZY_LOADING_IMAGE
    };
  },
  computed: {
    featureBox1() {
      return this.$store.getters["contents/appFeatures"];
    }
  },
  methods: {
    scrollFunc: function() {
      this.$SmoothScroll(document.getElementById("partners"));
    }
  }
};
</script>

<style scoped>
.section-title {
  margin-top: 0;
  letter-spacing: 0.2vh;
  font-weight: 100;
  font-size: 3vh;
}
.section-title span {
  font-weight: 400;
}
.section-title li {
  font-weight: 400;
  font-size: 2vh;
}
.section-intro {
  margin: 4vh 8vh 4vh 4vh;
  font-size: 1.8vh;
  line-height: 2.1vh;
  font-weight: 300;
  letter-spacing: 0.1vh;
}
</style>
