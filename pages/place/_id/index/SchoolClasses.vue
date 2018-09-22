<template>
  <v-container>
      <v-layout row wrap>
        <v-flex mb-5 xs12 v-if="model.classes !== null && model.classes !== undefined">
          <div class="heading" style="font-weight: bold">Classes</div>
          <v-container fluid v-bind="{ [`grid-list-xs`]: true }">
            <v-layout row wrap>
              <v-flex
                sm3 xs6
                v-for="(item,i) in model.classes" :key="i">
                <TextWithStar icon="star" :text="item.name"></TextWithStar>
              </v-flex>
            </v-layout>
          </v-container>
        </v-flex>
        <v-flex xs12 mb-5 v-if="model.subjects !== null && model.subjects !== undefined">
          <div class="heading" style="font-weight: bold">Subjects</div>
          <v-container fluid v-bind="{ [`grid-list-xs`]: true }">
            <v-layout row wrap>
              <v-flex
                sm3 xs6
                v-for="(item,i) in model.subjects" :key="i">
                <TextWithStar icon="star" :text="item.name"></TextWithStar>
              </v-flex>
            </v-layout>
          </v-container>
        </v-flex>
        <v-flex xs12 mb-5 v-if="model.singing !== null && model.singing !== undefined">
          <div class="heading" style="font-weight: bold">Singing</div>
          <v-container fluid v-bind="{ [`grid-list-xs`]: true }">
            <v-layout row wrap>
              <v-flex
                sm3 xs6
                v-for="(item,i) in model.singing" :key="i">
                <TextWithStar icon="star" :text="item.name"></TextWithStar>
              </v-flex>
            </v-layout>
          </v-container>
        </v-flex>
        <v-flex xs12  mb-5 v-if="model.dances !== null && model.dances !== undefined">
          <div class="heading" style="font-weight: bold">Dancing</div>
          <v-container fluid v-bind="{ [`grid-list-xs`]: true }">
            <v-layout row wrap>
              <v-flex
                sm3 xs6
                v-for="(item,i) in model.dances" :key="i">
                <TextWithStar icon="star" :text="item.name"></TextWithStar>
              </v-flex>
            </v-layout>
          </v-container>
        </v-flex>
        <v-flex xs12 mb-5 v-if="model.instruments !== null && model.instruments !== undefined">
          <div class="heading" style="font-weight: bold">Instruments</div>
          <v-container fluid v-bind="{ [`grid-list-xs`]: true }">
            <v-layout row wrap>
              <v-flex
                sm3 xs6
                v-for="(item,i) in model.instruments" :key="i">
                <TextWithStar icon="star" :text="item.name"></TextWithStar>
              </v-flex>
            </v-layout>
          </v-container>
        </v-flex>
      </v-layout>
    </v-container>
</template>

<script>
import TextWithStar from "@/components/utils/TextWithStar";
import config from "@/config.js";
import axios from "axios";
import ApiEndpoints from "@/constants/ApiEndpoints";
export default {
  name: "SchoolClasses",
  components: { TextWithStar },
  async asyncData({ store, params }) {
    let educationalPlace = store.getters["school/schools"](params.id);
    if ( educationalPlace === null || educationalPlace === undefined){
        try {
          let { data } = await axios.get(
              config.baseUrl + ApiEndpoints.GET_EP_BY_ID,{
                  params: {
                    id: params.id,
                  }
              }
            );
            store.dispatch("school/storeSchool", {data: data })

            return{
              model:data
            }
        } catch (error) {
            console.log("middleware/place.js error ==>",error)
        }
    }else{
      return{
              model:educationalPlace
            }
    }
  },
  head () {
    let model = this.model;
    return {
      title: `${model.name} | ${model.formattedAddress} | Classes, Subjects`,
      meta: [
        {
          hid: `description`,
          name: 'description',
          content: `${model.name} - ${model.description}`
        },
        {
          hid: `keywords`,
          name: 'keywords',
          keywords: `${model.name},details,rating,reviews,education,feeds,
            blogs,contact,facilities,extracurriculars,acitivities,blogs,reviews`
        }
      ]
    }
  },
  data: () => ({
    show: false,
  }),
  created() {
  }
};
</script>

<style scoped>
.review div {
  font-family: "Gudea", sans-serif;
}

.review p {
  font-family: "Magra", sans-serif;
}
</style>
