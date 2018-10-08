import config from "@/config.js";
import axios from "axios";
import ApiEndpoints from "@/constants/ApiEndpoints";

export default async function({ store, params, error }) {
    let user = store.getters["users/user"](params.id);
    if ( user === null || user === undefined){
        try {
            let { data } = await axios.get(
                config.baseUrl + ApiEndpoints.GET_USER_BY_PUBLIC_ID,{
                    params: {
                        firebaseUid: params.id,
                    }
                }
              );
            store.dispatch("users/storeUser", {data: data })
        } catch (e) {
            error({ statusCode:  e.response.status, message: e.response.data.message })
        }
    }
}