import config from "@/config.js";
import axios from "axios";
import ApiEndpoints from "@/constants/ApiEndpoints";

export default async function({ store, params }) {
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
        } catch (error) {
            console.log("middleware/place.js error ==>",error)
        }
    }
}