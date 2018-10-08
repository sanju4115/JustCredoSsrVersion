<template>
  <v-card class="justify-center grey lighten-3">
    <v-container mt-0 pt-0>
      <v-layout row wrap>
        <v-flex xs12 md4 sm12 pa-1>
          <v-card>
            <v-layout style="height: 10px" class="background">
              <div><br/></div>
            </v-layout>
            <v-card-media 
              :src="model.profilePic !== null ? model.profilePic : altProfilePic" height="400px" >
            </v-card-media>
            <v-card-title primary-title class="justify-center text-xs-center">
              <div>
                <h3 class="headline mb-0">{{model.name}}</h3>
                <div>
                  <span class="pl-2 grey--text text--darken-3 font-weight-light caption">
                    16,544 Followers, 4535 Followings
                  </span>
                </div>
                <div>
                  <span class="pl-2 grey--text text--darken-3 font-weight-light caption">
                    1 Reviews, 1 Bookmarks
                  </span>
                </div>
                <div class="pa-3 pt-0 caption">
                  <em>Portions of the materials used are trademarks and/or copyrighted works of Epic Games, Inc. All rights reserved by Epic. This material is not official and is not endorsed by Epic.</em>
                </div>
                <div v-if="model.description">{{model.description}}</div>
              </div>
            </v-card-title>
          </v-card>
        </v-flex>
        <v-flex xs12 md8 sm12 pa-1>
          <v-tabs
            color="background"
            dark
            show-arrows>
            <v-tabs-slider color="white"></v-tabs-slider>
            <v-tab
              v-for="(item,index) in tabItems" :key="index" router :to="'/'+item.link">
              {{ item.text }}
            </v-tab>
          </v-tabs>
           <div>
            <nuxt-child :key="$route.fullPath" class="nestedScroll white"></nuxt-child>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
  export default {
    name: "profileHome",
    components: {
    },
    middleware : "profile",
    asyncData({ store, params }) {
      let user = store.getters["users/user"](params.id);
      return{
              model:user
            }
    },
    data: function () {
      return {
        altProfilePic:"static/images/util/profile_picture_blank_portrait.png"
      };
    },
    computed:{
      currentUser(){
        return this.$store.getters["login/user"];
      },
      tabItems(){
        let id = this.$route.params.id;
        let tabItems = [
          { text: "Bookmarks", link: "profile/" + id + "/" },
          { text: "Reviews Shared", link: "profile/" + id + "/shared-review" },
          { text: "Followers", link: "profile/" + id + "/followers" },
          { text: "Following", link: "profile/" + id + "/followings" }
        ];
        if(this.currentUser !== null && this.currentUser.firebaseUid === this.model.firebaseUid){
          tabItems.push({ text: "Manage", link: "profile/" + id + "/admin" });
        }
        return tabItems;
      }
    },
    created() {
    },
    mounted(){
    }
  }
</script>

<style scoped>
  @import url(https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,600,700);

  .homebanner{
    overflow: hidden;
    position: relative;
    width:120%;
    margin-right:-60px;
    margin-left:-30px;
    height: 120%;
    background: rgba(0, 0, 0, 0.6);
  }

  .welcome {
    font-family: "Roboto", sans-serif;
    font-weight: 800;
    line-height: 3vh;
    font-size: 3vh;
    color: white;
  }

  .homebanner span {
    letter-spacing: 1px;
    font-size: 15px;
    font-weight: 400;
  }
  .homebanner h2 {
    font-family: "Roboto", sans-serif;
    line-height: 45px;
    letter-spacing: 1px;
    font-weight: 400;
  }

  .nestedScroll {
    overflow: auto;
    height: 600px;
    display:block;
  }
</style>
