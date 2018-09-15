<template>
    <LocationView 
        :localities=localities 
        baseRoute="/1/"
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
  async asyncData ( ) {
    let { data } = await axios.get(
      config.baseUrl + ApiEndpoints.GET_LOCALITIES_BY_COUNTRY_ID,{
        params: {
          countryId: 1,
        }
      }
    );
    return { 
        localities: data.data,
        breadcrumbs: data.breadcrumbs
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
