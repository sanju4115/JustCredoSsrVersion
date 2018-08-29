<template>
  <v-toolbar
    color="secondary"
    dark
    app
    :clipped-left="$vuetify.breakpoint.lgAndUp"
    fixed
    extense>
    <img style="cursor : pointer"
         @click.stop="onLogoClicked"
         src="/images/logos/logo_web.png"
         width="250px" class="text-xs-center"/>
    <v-text-field v-if="userIsAuthenticated"
                  flat
                  solo-inverted
                  prepend-icon="search"
                  label="Search"
                  class="hidden-sm-and-down ml-5"></v-text-field>
    <v-spacer></v-spacer>
    <v-toolbar-items
      v-if="!userIsAuthenticated"
      class="hidden-sm-and-down">
      <v-btn
        :active-class="undefined"
        flat
        v-for="(item, i) in items"
        :key="i"
        router
        :to="item.to">
        <span v-text="item.text" ></span>
      </v-btn>
    </v-toolbar-items>
    <v-btn
      v-if="!userIsAuthenticated"
      type="submit"
      color="red"
      router
      to="/login">
      Login
    </v-btn>
    <NotificationToolbar></NotificationToolbar>
    <DistanceMenu></DistanceMenu>
    <app-profile-menu v-if="userIsAuthenticated"></app-profile-menu>
  </v-toolbar>
</template>

<script>
import ProfileMenu from "./ProfileMenu.vue";
import NotificationToolbar from "./NotificationToolbar";
import DistanceMenu from "./DistanceMenu";

export default {
  name: "Toolbar",
  components: {
    DistanceMenu,
    NotificationToolbar,
    "app-profile-menu": ProfileMenu
  },
  data: () => ({
    items: [{ to: "/home", text: "Home" }, { to: "/about", text: "About" }]
  }),
  methods: {
    onLogoClicked: function() {
      this.$emit("onLogoClicked");
    },
    onLoginBtnClick: function() {
      this.$emit("onLoginBtnClick");
    }
  },
  computed: {
    userIsAuthenticated() {
      return (
        this.$store.getters["login/user"] !== null &&
        this.$store.getters["login/user"] !== undefined
      );
    },
    user() {
      return this.$store.getters["login/user"];
    },
    location() {
      return this.$store.getters["location/location"];
    }
  }
};
</script>

<style scoped>
</style>

