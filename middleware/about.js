import db from "../services/firebaseInit";

export default function ({store}) {
  const appFeatures = store.getters["contents/appFeatures"];
  if (appFeatures.length === 0){
    return db
      .collection("app_contents")
      .doc("Qv0P7uWPmCSwlZDOUGic")
      .collection("app_features")
      .get()
      .then(querySnapshots =>{
        const appFeatures = [];
        querySnapshots.forEach((doc) => {
          appFeatures.push(doc.data());
        });
        store.dispatch("contents/storeAppFeatures",appFeatures);
      })
      .catch(error => {
        console.log("store about.js build content Error getting documents: ", error);
      });
  }
}
