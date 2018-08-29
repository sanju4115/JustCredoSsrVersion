import firebase from "firebase";
import db from "../services/firebaseInit";

export default (context) => {
  const {store} = context;

  return new Promise((resolve) => {
    firebase.auth().onAuthStateChanged(user => {
      /**
       * Set service worker registered false as browser refresh
       */
      store.dispatch("login/setServiceWorkerRegistered", false);
      store.dispatch("school/clearSchools");
      if (user) {
        const docRef = db.collection("users").doc(user.uid);
        docRef.get().then(function(doc) {
          if (doc.exists) {
            console.log("User already exist:", doc.data());
          } else {
            const newUser = {
              name : user.displayName,
              email : user.email,
              emailVerified : user.emailVerified,
              profilePic : user.photoURL,
              uid : user.uid,
              providerData : user.providerData
            };
            docRef.set(newUser)
              .then(function() {
                console.log("Document successfully written!");
              })
              .catch(function(error) {
                console.error("Error writing document: ", error);
              });
          }
        }).catch(function(error) {
          console.log("Main.js onAuthStateChanged Error getting document:", error);
        });

        /**
         * Auto sign in
         */
        store.dispatch("login/autoSignIn", user);

      }else {
        /**
         * User session ended
         * so clear user and location
         */
        store.dispatch("location/clearLocation");
        store.dispatch("login/clearUser");
      }
      resolve()
    })
  })
}
