<template>
    <v-parallax :src="FOOTER_1" style="height: 400px">
      <v-container>
        <v-layout row wrap fill-height class="align-center">
          <v-flex xs8 offset-xs2 class="justify-center text-xs-center">
            <v-card class="light-blue darken-3 elevation-20 mb-2">
              <v-card-title class="justify-center colorPrimaryText--text">
                <h1 class="welcome">
                  Don't have educational networking profile yet?
                </h1>
              </v-card-title>
            </v-card>
            <v-btn large
                :to="'/login'"
                dark
                class="pink darken-3 mt-4">
              Create Now</v-btn>
            <v-btn large
                   :to="'/about'"
                   dark
                   class="cyan darken-3 mt-4">
              Know More</v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </v-parallax>
</template>

<script>
import images from "@/constants/images";
export default {
    name: "FooterMessage",
    data: () => ({
        FOOTER_1: images.FOOTER_1,
    }),
}
</script>

  
