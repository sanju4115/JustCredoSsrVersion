<template>
    <LocationView 
        :localities=localities 
        :baseRoute="`/directory/${params.country}/`"
        :showCategory=false
        :breadcrumbs=breadcrumbs></LocationView>
</template>

<script>
import config from "@/config.js";
import axios from "axios";
import ApiEndpoints from "@/constants/ApiEndpoints";
import LocationView from "@/components/place/LocationView";
export default {
  name: "home",
  components: { LocationView },
  async asyncData ( {params} ) {
    let { data } = await axios.get(
      config.baseUrl + ApiEndpoints.GET_LOCALITIES_BY_COUNTRY_ID,{
        params: {
          countryId: params.country,
        }
      }
    );
    return { 
        localities: data.data,
        breadcrumbs: data.breadcrumbs,
        params : params
     }
  },
  data: () => ({
  }),
  created() {
  },
  computed: {
  },
  methods: {
  },
  mounted() {
    
  }
};
</script>

<style scoped>

</style>
