<template>
  <v-container fluid pa-0>
    <v-parallax :src="PARTNERS_BANNER"
                height="600" class="secondary">
      <v-container>
        <v-layout row wrap fill-height class="align-center">
          <v-flex xs6 offset-xs3 class="justify-center text-xs-center">
            <v-card class="teal darken-3 elevation-20 mb-2">
              <v-card-title class="justify-center colorPrimaryText--text">
                <h1 class="welcome">
                  Advertise Your Educational Place Here
                </h1>
              </v-card-title>
            </v-card>
            <v-card class="blueBackground elevation-20 mb-2">
              <v-card-title class="justify-center colorPrimaryText--text">
                <p class="welcomeP">Create
                  <span class="typewrite"
                        data-period="3000"
                        data-type='[ "School",
                      "Music Class",
                      "Sports Class",
                      "Coaching",
                       "Tutors"]'>
                  <span class="wrap"></span>
                </span>
                  Profile Here !
                </p>
              </v-card-title>
            </v-card>
            <v-btn large
                   @click="scrollFunc()"
                   dark
                   class="mt-4">
              Create Now</v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </v-parallax>
    <v-layout row wrap>
      <v-card class="text-xs-center pa-2" id="partners">
        <v-layout row wrap>
          <v-flex xs8 offset-xs2>
            <v-card class="featureBox elevation-0 mt-5" style="float:right">
              <div class="features2-content pa-2">
                <h2 class="section-title">Create your advertising profile very easily by clicking on
                  <span>Add Place</span> in profile section.</h2>
                <p>Owners of schools, coaching, music classes, sports classes, art classes and
                  private/home tutors can create their advertising profile very easily.
                  They just need to fill up a form after selecting a
                  appropriate option and their profile will be visible to the end users as soon as they save and submit it.</p>
              </div>
            </v-card>
          </v-flex>
        </v-layout>
        <img :src="B2B_SERVICES" style="height:600px"class="text-xs-center"/>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
import images from "../constants/images";

export default {
  name: "partners",
  data() {
    return {
      B2B_SERVICES: images.B2B_SERVICES,
      PARTNERS_BANNER: images.PARTNERS_BANNER
    };
  },
  mounted() {

    let TxtType = function(el, toRotate, period) {
      this.toRotate = toRotate;
      this.el = el;
      this.loopNum = 0;
      this.period = parseInt(period, 10) || 2000;
      this.txt = '';
      this.tick();
      this.isDeleting = false;
    };

    TxtType.prototype.tick = function() {
      let i = this.loopNum % this.toRotate.length;
      let fullTxt = this.toRotate[i];

      if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
      } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
      }

      this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

      let that = this;
      let delta = 200 - Math.random() * 100;

      if (this.isDeleting) { delta /= 2; }

      if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
      } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
      }

      setTimeout(function() {
        that.tick();
      }, delta);
    };


    let elements = document.getElementsByClassName('typewrite');
    for (let i=0; i<elements.length; i++) {
      let toRotate = elements[i].getAttribute('data-type');
      let period = elements[i].getAttribute('data-period');
      if (toRotate) {
        new TxtType(elements[i], JSON.parse(toRotate), period);
      }
    }
    // INJECT CSS
    let css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff;font-family:Roboto, " +
      "                  sans-serif;font-weight: 400;\n" +
      "                  line-height: 4.8vh;\n" +
      "                  margin-bottom: 2%;\n" +
      "                  font-size: 3.5vh;}";
    document.body.appendChild(css);

  }
};
</script>

<style scoped>
  .featureBox {
    padding-right: 15px;
    padding-left: 15px;
  }

  .features2-content {
    margin-top: 4.5%;
  }

  .features2-content p {
    font-family: "Roboto", sans-serif;
    font-size: 2vh;
    font-weight: 300;
    line-height: 3vh;
    letter-spacing: 0.2vh;
    margin-top: 7%;
  }

  .section-title {
    margin-top: 0;
    letter-spacing: 0.2vh;
    font-weight: 100;
    font-size: 3vh;
  }
  .section-title span {
    font-weight: 400;
  }

  .welcomeP{
    font-family: "Roboto", sans-serif;
    font-weight: 400;
    line-height: 4.8vh;
    margin-bottom: 2vh;
    font-size: 3.5vh;
  }

</style>
