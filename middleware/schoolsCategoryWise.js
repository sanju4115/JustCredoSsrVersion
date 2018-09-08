import db from "@/services/firebaseInit";
console.log(process.env.NODE_ENV, 'process');

export default async function({ store }) {
  console.log("/home middleware")
  const schoolsForStoring = [];
  const LIMIT = 8;
  const categories = store.getters["categories/categories"];
  const areaRangeSelected = store.getters["shared/areaSelected"];
  const promises = [];
  const location = store.getters["location/location"];
    categories.forEach(async category => {
      const placeType = "placeType" + "." + category.key;
      let promise;
      if(location !== undefined && location !== null){
        promise = db
          .collection("schools")
          .where("published", "==", true)
          .where(placeType, "==", true)
          .where(
            `location.${areaRangeSelected}`,
            "==",
            location[areaRangeSelected]
          )
          .orderBy("rating", "desc")
          .limit(LIMIT)
          .get();
      }else{
        promise = db
          .collection("schools")
          .where("published", "==", true)
          .where(placeType, "==", true)
          .orderBy("time", "desc")
          .limit(LIMIT)
          .get();
      }
      promises.push(promise);
    });
    const snapshots = await Promise.all(promises);
    for (let i = 0; i < snapshots.length; i++) {
      const schools = [];
      snapshots[i].forEach(doc => {
        const school = doc.data();
        if (school.coverPic === undefined || school.coverPic === null) {
          if (school.images !== undefined && school.images !== null) {
            school["coverPic"] = Object.values(school.images)[0];
          }
        }
        schools.push(school);
        schoolsForStoring.push(doc.data());
      });
      console.log(schools.length);
      store.dispatch(`school/${categories[i].key}`, schools); //storing to the store to use in future
    }
    store.dispatch("school/storeSchools", { data: schoolsForStoring }); //storing to the store to use in future   
  if (schoolsForStoring.length === 0) {
    console.log("setting service availabel to false");
    store.dispatch("shared/isServiceAvailable", false); //setting service availabel to false
  } else {
    store.dispatch("shared/isServiceAvailable", true); //setting service availabel to true
  }
}
