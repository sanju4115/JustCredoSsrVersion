<template>
    <LocationView
        :heading="heading"
        :subHeading="subHeading"
        :localities=localities 
        baseRoute="/directory/"
        :showCategory=false
        :breadcrumbs=[]></LocationView>
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
      config.baseUrl + ApiEndpoints.GET_ALL_CUNTRIES
    );
    return { 
        localities: data,
     }
  },
  data: () => ({
    heading : "Countries To Browse",
    subHeading: "Select country to browse educational place"
  }),
  created() {
  },
  computed: {
  },
  methods: {
  },
  mounted() {
    axios.get(`https://api.ipgeolocation.io/getip`).then(res => {
      console.log(res);
    });
    
  }
};
</script>

<style scoped>

</style>
