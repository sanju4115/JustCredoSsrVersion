<template>
  <v-menu
    lazy
    v-if="currentUser"
    offset-x
    max-width="400"
    close-on-content-click
    :nudge-width="200"
    v-model="menu">
    <v-badge slot="activator" overlap color="blue" class="ma-2">
      <span slot="badge">3</span>
      <v-avatar
        color="background red--after" size="35">
        <v-icon dark>notifications</v-icon>
      </v-avatar>
    </v-badge>
    <v-layout class="white">
      <v-layout row wrap>
        <span class="subheading pl-3 pt-2" style="font-weight: bold">Notifications</span>
        <v-spacer></v-spacer>
        <span class="caption mr-4 pt-2" style="font-weight: bold">Settings</span>
        <v-flex xs12>
          <v-list two-line>
            <template v-for="item in notification">
              <v-list-tile avatar @click="onClickNotification(item)">
                <v-list-tile-avatar>
                  <img :src="item.imageURL">
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title v-html="item.heading"></v-list-tile-title>
                  <v-list-tile-sub-title v-html="item.description"></v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-divider inset></v-divider>
            </template>
          </v-list>
        </v-flex>
        <v-layout class="text-xs-center">
          <v-flex xs12 pa-3 class="grey lighten-3">
            <span class="subheading" style="font-weight: bold">See All</span>
          </v-flex>
        </v-layout>
      </v-layout>
    </v-layout>
  </v-menu>
</template>

<script>
  import db from "../../services/firebaseInit";
  import InfiniteLoading from "vue-infinite-loading";

  export default {
  name: "NotificationToolbar",
  components: {
    InfiniteLoading
  },
  data: function() {
    return {
      menu: false,
      notification: [],
      LIMIT: 5,
      firstTime: true,
      notificationSubscription:null
    };
  },
  created() {

  },
  methods: {
    buildEvenListener() {
      /*this.notificationSubscription = db
        .collection("userNotifications")
        .where("toUid", "==", this.currentUser.uid)
        .orderBy("timestamp", "desc")
        .limit(this.LIMIT)
        .onSnapshot(snapshot => {
          snapshot.docChanges.forEach(change => {
            if (change.type === "added") {
              const notificationExist = this.notification.find(notification => {
                return notification.id === change.doc.data().id;
              });

              if (!notificationExist) {
                console.log("New review: ", change.doc.data());
                this.notification.push(change.doc.data());
              }
            }
          });
        });*/
    },
    onClickNotification(notification){
      if (notification.type === "school_approval") {
        this.$router.push("/approval/" + notification.schoolId);
      }
    }
  },
  computed: {
    currentUser(){
     return this.$store.getters.user;
    }
  },
  watch: {
    currentUser(user) {
      if (user !== null && user !== undefined) {
        this.buildEvenListener();
      }
    }
  },

  /**
   * Called before destroying this component
   *
   * un-subscribing from database listeners
   */
  beforeDestroy() {
    if (this.notificationSubscription !== null) {
      this.notificationSubscription();
    }
  }
};
</script>

<style scoped>
  .nestedScroll {
    overflow: auto;
    height: 60vh;
    display: block;
  }
</style>
