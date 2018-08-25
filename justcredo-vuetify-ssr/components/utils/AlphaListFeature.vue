<template>
  <v-container grid-list-xl>
    <v-layout wrap>
      <v-flex
        v-for="(feature, i) in features"
        :key="i"
        xs12
        sm6
        md4>
        <v-card
          flat
          class="transparent justify-center">
          <v-layout class="justify-center" justify-center>
            <v-flex xs2>
              <img :src="feature.image" style="height: 5vh"/>
            </v-flex>
            <v-flex>
              <div class="subheading mb-3">
                <strong v-text="feature.name" ></strong>
              </div>
              <p>{{feature.description}}</p>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "alpha-list-feature",
  props: {
    features: {
      type: Array,
      default: () => []
    }
  }
};
</script>
