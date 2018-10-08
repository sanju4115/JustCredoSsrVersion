<template>
  <v-img
    :src="LOGIN_BANNER_2">
      <v-container>
        <v-layout row wrap mt-5>
          <v-flex sm12 md6 pa-3>
            <div style="background: rgba(0, 0, 0, 0.2)">
              <v-layout row wrap class="pa-3 text-xs-center justify-center">
                <v-flex xs12>
                  <h2 class="section-title">JustCredo is the <span>next generation</span> educational networking</h2>
                </v-flex>
                <v-flex xs12 mt-5>
                  <p class="section-intro colorPrimaryText--text">
                    We are transforming the way end users and educational
                    institute used to interact with each other by creating a
                    digital ecosystem where they can interact with each other directly.
                  </p>
                </v-flex>
                <v-flex xs12 mt-5>
                  <h2 class="section-title">Join Our Community Now</h2>
                </v-flex>
                <v-flex xs12 mt-2 mb-5>
                  <img style="cursor : pointer"
                       src="/images/logos/logo_web.png"
                       width="250px" class="text-xs-center"/>
                </v-flex>
              </v-layout>
            </div>
          </v-flex>
          <v-flex sm12 md6 pa-3>
            <LoginAndRegister></LoginAndRegister>
          </v-flex>
        </v-layout>
      </v-container>
  </v-img>
    <!-- </div> -->
</template>

<script>
import images from "../constants/images";
import LoginAndRegister from "../components/utils/LoginAndRegister";

export default {
  name: "login",
  components: { LoginAndRegister },
  data: () => ({
    LOGIN_BANNER_2: images.LOGIN_BANNER_2,
    LAZY_LOADING_IMAGE: images.LAZY_LOADING_IMAGE
  })
};
</script>

<style scoped>
.section-title {
  letter-spacing: 0.2vh;
  font-weight: 400;
  font-size: 3vh;
  color: white;
}
.section-title span {
  font-weight: 400;
}
.section-intro {
  font-size: 2vh;
  line-height: 2.1vh;
  font-weight: 400;
  letter-spacing: 0.1vh;
}
</style>
