import db from "@/services/firebaseInit";
import config from "@/config.js";
import axios from "axios";
import ApiEndpoints from "@/constants/ApiEndpoints";

export default async function({ store }) {
  const categories = store.getters["categories/categories"];
  const areaRangeSelected = store.getters["shared/areaSelected"];
  const location = store.getters["location/location"];
  try {
    let schoolsCategoryWise = await axios.get(
      config.baseUrl + ApiEndpoints.FIND_LOCATION_WISE, {
        params: {
          geoHash: areaRangeSelected,
          geoHashValue: (location !== null && location !== undefined ) ? location[areaRangeSelected] : ""
        }
      }
    );
    let isServiceAvailable = false;
    for (let i = 0; i < categories.length; i++) { //storing to the store to use in future
      let schools = schoolsCategoryWise.data[categories[i].key];
      if(!isServiceAvailable && schools.length > 0){
        isServiceAvailable = true;
      }
      store.dispatch(`school/${categories[i].key}`, schoolsCategoryWise.data[categories[i].key]);
    }

    store.dispatch("shared/isServiceAvailable", isServiceAvailable); //setting service availabel to false
  
  } catch (error) {
    console.log(
      "store schoolsCategoryWise.js build content Error getting documents: ",
      error
    );
  }


    // categories.forEach(async category => {
    //   const placeType = "placeType" + "." + category.key;
    //   let promise;
    //   if(location !== undefined && location !== null){
    //     promise = db
    //       .collection("schools")
    //       .where("published", "==", true)
    //       .where(placeType, "==", true)
    //       .where(
    //         `location.${areaRangeSelected}`,
    //         "==",
    //         location[areaRangeSelected]
    //       )
    //       .orderBy("rating", "desc")
    //       .limit(LIMIT)
    //       .get();
    //   }else{
    //     promise = db
    //       .collection("schools")
    //       .where("published", "==", true)
    //       .where(placeType, "==", true)
    //       .orderBy("time", "desc")
    //       .limit(LIMIT)
    //       .get();
    //   }
    //   promises.push(promise);
    // });
    // const snapshots = await Promise.all(promises);
    // for (let i = 0; i < snapshots.length; i++) {
    //   const schools = [];
    //   snapshots[i].forEach(doc => {
    //     const school = doc.data();
    //     if (school.coverPic === undefined || school.coverPic === null) {
    //       if (school.images !== undefined && school.images !== null) {
    //         school["coverPic"] = Object.values(school.images)[0];
    //       }
    //     }
    //     schools.push(school);
    //     schoolsForStoring.push(doc.data());
    //   });
    //   console.log(schools.length);
    //   store.dispatch(`school/${categories[i].key}`, schools); //storing to the store to use in future
    // }
    //store.dispatch("school/storeSchools", { data: schoolsForStoring }); //storing to the store to use in future   
  // if (schoolsForStoring.length === 0) {
  //   console.log("setting service availabel to false");
  //   store.dispatch("shared/isServiceAvailable", false); //setting service availabel to false
  // } else {
  //   store.dispatch("shared/isServiceAvailable", true); //setting service availabel to true
  // }
}
