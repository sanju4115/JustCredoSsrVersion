import config from "@/config.js";
import axios from "axios";
import ApiEndpoints from "@/constants/ApiEndpoints";

export default async function({ store, params, error, app, redirect}) {
    let idToken = app.$cookies.get('firebase-user-token');
      if(!idToken){
        redirect('/login');
      }
      const id = params.id;
      let placesManaged = store.getters["placeAdmin/placesManaged"](id);
      if ( placesManaged === null || placesManaged === undefined){
          try {
              var configData = {
                  headers: {'X-Authorization-Firebase': idToken},
                  params : {
                    publicId : id
                  }
                };
              let { data } = await axios.get(
                  config.baseUrl + ApiEndpoints.GET_PLACE_MANAGED_BY_PLACE_PUBLIC_ID,
                  configData
              );
              store.dispatch("placeAdmin/storePlacesManaged", {id:id,data: data})
          } catch (e) {
              error({ statusCode:  e.response.status, message: e.response.data.message })
          }
      }
}