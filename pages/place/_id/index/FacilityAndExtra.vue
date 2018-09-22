<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 v-if="model.facilities !== null && model.facilities !== undefined">
        <div class="heading" style="font-weight: bold">Facilities</div>
        <v-container fluid v-bind="{ [`grid-list-xs`]: true }">
          <v-layout row wrap>
            <v-flex
              sm3 xs6
              v-for="(item,i) in model.facilities" :key="i">
              <TextWithStar icon="star" :text="item.name"></TextWithStar>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
      <v-flex xs12 mt-5 v-if="model.specialFacilities !== null && model.specialFacilities !== undefined">
        <div class="heading" style="font-weight: bold">Special Facilities</div>
        <v-container fluid v-bind="{ [`grid-list-xs`]: true }">
          <v-layout row wrap>
            <v-flex
              sm3 xs6
              v-for="(item,i) in model.specialFacilities" :key="i">
              <TextWithStar icon="star" :text="item.name"></TextWithStar>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
      <v-flex xs12 mt-5 v-if="model.extracurriculars !== null && model.extracurriculars !== undefined">
        <div class="heading" style="font-weight: bold">Extracurricular Activities</div>
        <v-container fluid v-bind="{ [`grid-list-xs`]: true }">
          <v-layout row wrap>
            <v-flex
              sm3 xs6
              v-for="(item,i) in model.extracurriculars" :key="i">
              <TextWithStar icon="star" :text="item.name"></TextWithStar>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import config from "@/config.js";
import axios from "axios";
import ApiEndpoints from "@/constants/ApiEndpoints";
import TextWithStar from "@/components/utils/TextWithStar";
export default {
  name: "FacilityAndExtra",
  components: {TextWithStar},
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
    }
  },
  head () {
    let model = this.model;
    return {
      title: `${model.name} | Facilities, Extracuricullar Activities`,
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
  }),
  created(){
  }
};
</script>

<style scoped>
  .review div{
    font-family: 'Gudea', sans-serif;
  }

  .review p{
    font-family: 'Magra', sans-serif;
  }
</style>
