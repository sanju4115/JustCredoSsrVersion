<template>
  <v-tabs
    v-if="!user"
    dark
    color="primary"
    centered
    show-arrows>
    <v-tabs-slider color="white"></v-tabs-slider>
    <v-tab>Login</v-tab>
    <v-tab>Register</v-tab>
    <v-tabs-items>
      <v-tab-item>
        <v-card class="primary">
          <v-container>
            <v-layout row v-if="loginError">
              <v-flex>
                <app-alert-error @dismissed="onDismissedLoginError" :text="loginError.message"></app-alert-error>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex>
                <v-card class="secondary white--text elevation-24 ma-2">
                  <v-card-title primary-title>
                  </v-card-title>
                  <v-card-text>
                    <Login></Login>
                  </v-card-text>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card class="primary">
          <v-container>
            <v-layout row v-if="error">
              <v-flex>
                <app-alert-error @dismissed="onDismissed" :text="error.message"></app-alert-error>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex>
                <v-card class="secondary white--text elevation-24 ma-2">
                  <v-card-title primary-title>
                    <div class="title">Register Now</div>
                    <div>Educational Networking - Find And Advertise Educational Places Here Location Wise</div>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <Register></Register>
                    </v-container>
                  </v-card-text>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
    <!--<v-spacer></v-spacer>-->
    <!--<v-btn flat @click.stop="closeDialogue">Close</v-btn>-->
  </v-tabs>

</template>

<script>
import Login from "./formUtil/Login";
import Register from "./formUtil/Register";
export default {
  name: "LoginAndRegister",
  components: {Register, Login },
  created(){
  },
  computed: {
    error() {
      return this.$store.getters["shared/error"];
    },
    loginError() {
      return this.$store.getters["login/loginError"];
    },
    user(){
      let user = this.$store.getters["login/user"];
      if(user != null){
        this.$router.push("/")
      }      
      return user;
    }
  },
  methods: {
    onDismissed: function() {
      this.$store.dispatch("shared/clearError");
    },
    onDismissedLoginError() {
      this.$store.dispatch("login/clearLoginError");
    },
    closeDialogue() {
      this.$emit("closeDialogue");
    },
  }
};
</script>

<style scoped>
</style>
