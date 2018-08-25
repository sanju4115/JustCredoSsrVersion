<template>
  <v-container fluid pa-0>
    <v-parallax :src="MISSION_BANNER"
                height="480" class="secondary">
      <v-container>
        <v-layout row wrap fill-height class="align-center">
          <v-flex xs8 offset-xs2 class="text-xs-center">
              <h2 class="section-title primary--text">Single Point Of Contact For People Related With
                <br><span>Educational Networking</span> in any way.</h2>
          </v-flex>
          <v-flex xs6 offset-xs3 class="justify-center text-xs-center">
            <v-card class="teal darken-3 elevation-20 mb-2">
              <v-card-title class="justify-center colorPrimaryText--text">
                <h1 class="welcome">
                  Educational Networking
                </h1>
              </v-card-title>
            </v-card>
            <v-btn large
                   @click="scrollFunc()"
                   dark
                   class="mt-4">
              Know More</v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </v-parallax>
    <v-layout row wtap>
      <v-flex
        xs8
        offset-xs2
        mt-5 mb-5
        v-for="(testimonial, i) in testimonials.slice(0,2)"
        :key="i">
        <alpha-testimonial
          :author="testimonial.author"
          :title="testimonial.title"
          :quote="testimonial.quote"
        />
      </v-flex>
    </v-layout>

    <v-layout row wrap>
      <v-container id="mission" class="justify-center text-xs-center text-md-left grey lighten-3" fluid>
        <v-layout row wrap class="justify-center mt-5">
          <v-flex sm6 xs12 pa-3>
            <v-card dark class="transparent fadeInCustom background--text elevation-0 mb-5">
              <v-card-media :src="MISSION_1" height="40vh">
              </v-card-media>
            </v-card>
          </v-flex>
          <v-flex sm6 xs12 pa-3>
            <v-card dark class="transparent fadeInCustom background--text elevation-0 mb-5">
              <v-card-title class="justify-center">
                <div align="center" style="height: 40vh">
                  <h2 class="section-title">We help <span>schools, coaching, music classes, sports classes, art classes and private/home tutors</span>
                    to take digital route for advertising themselves seamlessly.</h2>
                  <p class="section-intro title mt-5">JustCredo aims at providing people easy way to search for schools, coaching, music classes, sports classes,
                    art classes and private/home tutors, compare them by rating and reviews shared by end users.
                    They can browse them category wise as well as location wise.
                  </p>
                </div>
              </v-card-title>
            </v-card>
          </v-flex>

          <v-flex sm6 xs12 pa-3>
            <v-card dark class="transparent fadeInCustom background--text elevation-0 mb-5">
              <v-card-title class="justify-center">
                <div align="center" style="height: 40vh">
                  <h2 class="section-title">Single Point Of Contact For People Related With <br><span>Educational Networking</span> in any way.</h2>
                  <p class="section-intro title mt-5">JustCredo's mission is to provide a educational networking platform to people
                    where they can find any type of educational institute very easily through mobile application.
                    For educational institutes owner they can create profile on this application and digitally advertise themselves to the world.
                  </p>
                </div>
              </v-card-title>
            </v-card>
          </v-flex>
          <v-flex sm6 xs12 pa-3>
            <v-card dark class="transparent fadeInCustom background--text elevation-0 mb-5">
              <v-card-media :src="MISSION_2" height="40vh">
              </v-card-media>
            </v-card>
          </v-flex>

          <!--<v-flex xs12 md6 pa-3 feature>
            <v-card dark class="transparent fadeInCustom background&#45;&#45;text elevation-0 mb-5">
              <v-card-media :src="MISSION_1" height="600px">
              </v-card-media>
              <v-card-title class="justify-center">
                <div align="center" style="height: 36vh">
                  <h2 class="section-title">We help <span>schools, coaching, music classes, sports classes, art classes and private/home tutors</span>
                    to take digital route for advertising themselves seamlessly.</h2>
                  <p class="section-intro pl-5 pr-5">JustCredo aims at providing people easy way to search for schools, coaching, music classes, sports classes,
                    art classes and private/home tutors, compare them by rating and reviews shared by end users.
                    They can browse them category wise as well as location wise.
                  </p>
                </div>
              </v-card-title>
            </v-card>
          </v-flex>
          <v-flex xs12 md6 pa-3 class="mb-5 feature">
            <v-card dark class="transparent fadeInCustom background&#45;&#45;text elevation-0 mb-5">
              <v-card-media :src="MISSION_2" height="600px">
              </v-card-media>
              <v-card-title class="justify-center">
                <div align="center" style="height: 36vh">
                  <h2 class="section-title">Single Point Of Contact For People Related With <br><span>Educational Networking</span> in any way.</h2>
                  <p class="section-intro pl-5 pr-5">JustCredo's mission is to provide a educational networking platform to people
                    where they can find any type of educational institute very easily through mobile application.
                    For educational institutes owner they can create profile on this application and digitally advertise themselves to the world.
                  </p>
                </div>
              </v-card-title>
            </v-card>
          </v-flex>-->
        </v-layout>
      </v-container>
    </v-layout>
  </v-container>
</template>

<script>
import images from "../constants/images";
import AlphaTestimonial from "../components/utils/AlphaTestimonial";

export default {
  name: "mission",
  components: {AlphaTestimonial},
  data() {
    return {
      MISSION_1: images.MISSION_1,
      MISSION_2: images.MISSION_2,
      MISSION_BANNER:images.MISSION_BANNER,
      testimonials:[
        {
          quote:"Education is for improving the lives of others and for leaving your community and world better than you found it.",
          author:"Marian Wright Edelman",
          title:"Activist"
      }]
    };
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
