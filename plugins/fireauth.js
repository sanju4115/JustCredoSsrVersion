import firebase from "firebase";
import config from "@/config.js";
import axios from "axios";
import ApiEndpoints from "@/constants/ApiEndpoints";

export default ({store, redirect, isServer,app}) => {
  return new Promise((resolve) => {
    firebase.auth().onAuthStateChanged(async user => {
      store.dispatch("login/setServiceWorkerRegistered", false); // Set service worker registered false as browser refresh
      if (user) {
        console.log("Authentication changed")
        store.dispatch("shared/setDialogText", "Signing In");
        store.dispatch("shared/setDialog", true);
        try {
          var response = await axios.get(
            config.baseUrl + ApiEndpoints.SIGN_IN_BY_FIREBASE_UID,{
                params: {
                  firebaseUid: user.uid,
                }
            });
            let idToken = await firebase.auth().currentUser.getIdToken(/* forceRefresh */ true);
            if (idToken) {
                app.$cookies.set('firebase-user-token', idToken)
            }
            store.dispatch("login/autoSignIn", response.data);
        } catch (error) {
          console.log("Error response ==>",error.response, error)
        }
      } else {
        
      }
      console.log("Authentication changed")
      store.dispatch("shared/setDialog", false);
      store.dispatch("shared/setDialogText", "");
      resolve()
    });
    
  })
}
