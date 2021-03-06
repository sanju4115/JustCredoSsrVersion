<template>
  <v-navigation-drawer
    stateless
    v-bind:class="{navigationBar:$vuetify.breakpoint.lgAndUp}"
    class="indicatorColor"
    dark
    fixed
    :clipped="$vuetify.breakpoint.lgAndUp"
    app
    :value="drawerState">
    <v-list>
      <template v-for="item in items">
        <v-layout row v-if="item.heading" align-center :key="item.heading">
          <v-flex xs6>
            <v-subheader v-if="item.heading">
              {{ item.heading }}
            </v-subheader>
          </v-flex>
          <v-flex xs6 class="text-xs-center">
            <a href="#!" class="body-2 black--text">EDIT</a>
          </v-flex>
        </v-layout>
        <v-list-group
          v-else-if="item.children"
          v-model="item.model"
          :key="item.text"
          :prepend-icon="item.model ? item.icon : item['icon-alt']"
          append-icon="">
          <v-list-tile slot="activator" router :to="item.link">
            <v-list-tile-content>
              <v-list-tile-title>
                {{ item.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile
            v-for="child in item.children"
            :key="child.text" router :to="child.link">
            <v-list-tile-action v-if="child.icon">
              <v-icon>{{ child.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ child.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list-group>
        <v-list-tile v-else :key="item.text" router :to="item.link">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              {{ item.text }}
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "NavigationDrawer",
  props: ["drawerState"],
  computed: {
    userIsAuthenticated() {
      return (
        this.$store.getters["login/user"] !== null &&
        this.$store.getters["login/user"] !== undefined
      );
    },
    items(){
      let items = [
        {
        icon: "home",
        text: "Home",
        link: "/"
        },
        {
          icon: "pages",
          text: "Feeds",
          link: "/feeds"
        },
        {
          icon: "burst_mode",
          text: "Blogs",
          link: "/blogs"
        },
        {
        icon: "settings",
        text: "Services",
        link: "/services"
        },
        {
          icon: "help",
          text: "About",
          link: "/about"
        },
        {
          icon: "phonelink",
          text: "Partners",
          link: "/partners"
        },
        {
          icon: "group_work",
          text: "Mission",
          link: "/mission"
        },
        {
          icon: "chat_bubble",
          text: "Send feedback",
          link: "/profile"
        }
      ];
      if(!this.userIsAuthenticated){
        items.unshift({
          icon: "account_box",
          text: "Login",
          link: "/login"
        });
      }else{
        const user = this.$store.getters["login/user"];
        items.push({
              icon: "add_box",
              text: "Add Place",
              link: "/addPlace"
            });
        items.push({
          icon: "person",
          text: "Profile",
          link: "/profile/" + user.firebaseUid
        });
        items.push({
          icon: "border_color",
          text: "Edit Profile",
          link: "/editProfile"
        });
        user.authorities.forEach(element => {
          if(element.authority=== "ROLE_ADMIN"){
            items.push({
              icon: "dashboard",
              text: "Admin",
              link: "/adminDashboard"
            });
          }
        });
      }
      return items;
    }
  },
  data: () => ({
    drawer: true
  })
};
</script>

<style scoped>
.navigationBar {
  height: 100%;
  z-index: auto;
}
</style>
