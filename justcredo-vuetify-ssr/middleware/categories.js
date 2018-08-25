import db from "../services/firebaseInit";

export default function ({store}) {
  // const promises = [];
  // return db
  //         .collection("categories")
  //         .get()
  //         .then(async querySnapshot => {
  //           let categories = [];
  //           querySnapshot.forEach(doc => {
  //             const category = doc.data();
  //             categories.push(category);
  //             const LIMIT = 8;
  //             const placeType = "placeType" + "." + category.key;
  //             const promise = db.collection("schools")
  //               .where("published","==",true)
  //               .where(placeType, "==", true)
  //               .where("location.geohash50", "==", store.getters["location/location"].geohash50)
  //               .orderBy("rating", "desc")
  //               .limit(LIMIT)
  //               .get();
  //
  //             promises.push(promise);
  //           });
  //           store.dispatch("categories/storeCategories", categories); //storing to the store to use in future
  //           const schoolsForStoring = [];
  //           const snapshots = await Promise.all(promises);
  //           for (let i=0;i<snapshots.length;i++){
  //             const schools = [];
  //             snapshots[i].forEach(doc => {
  //               const school = doc.data();
  //               if (school.coverPic === undefined || school.coverPic === null) {
  //                 if (school.images !== undefined && school.images !== null){
  //                   school["coverPic"] = Object.values(school.images)[0];
  //                 }
  //               }
  //               schools.push(school);
  //               schoolsForStoring.push(doc.data());
  //             });
  //             console.log(schools.length);
  //             store.dispatch(`school/${categories[i].key}`, schools); //storing to the store to use in future
  //           }
  //           store.dispatch("school/storeSchools", { data: schoolsForStoring }); //storing to the store to use in future
  //         })
  //         .catch(error => {
  //           console.log("categories.js build content Error getting documents: ", error);
  //         });
}
