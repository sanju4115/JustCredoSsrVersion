import config from "@/config.js";
import axios from "axios";
import ApiEndpoints from "@/constants/ApiEndpoints";

export default async function({ store, params, error, app, redirect}) {
    let idToken = app.$cookies.get('firebase-user-token');
    if(!idToken){
        redirect('/login');
    }
    let placesManaged = store.getters["users/placesManaged"](params.id);
    if ( placesManaged === null || placesManaged === undefined){
        try {
            var configData = {
                headers: {'X-Authorization-Firebase': idToken}
              };
            let { data } = await axios.get(
                config.baseUrl + ApiEndpoints.GET_PLACES_MANAGED,
                configData
            );
            store.dispatch("users/storePlacesManaged", {id:params.id,data: data})
        } catch (e) {
            error({ statusCode:  e.response.status, message: e.response.data.message })
        }
    }
}