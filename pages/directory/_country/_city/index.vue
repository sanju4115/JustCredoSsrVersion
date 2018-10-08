<template>
  <LocationView 
    :localities=subLocalities 
    :baseRoute="`/directory/${params.country}/${params.city}/`"
    :showCategory=true
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
  async asyncData ( {params}) {
    let { data } = await axios.get(
      config.baseUrl + ApiEndpoints.GET_SUBLOCALITIES1_BY_LOCALITY_ID,{
        params: {
          localityId: params.city
        }
      }
    );
    return { 
      subLocalities: data.data,
      breadcrumbs: data.breadcrumbs,
      params: params
    }
  },
  data: () => ({
  })
};
</script>

<style scoped>
</style>
