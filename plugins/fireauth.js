import firebase from "firebase";
import config from "@/config.js";
import axios from "axios";
import ApiEndpoints from "@/constants/ApiEndpoints";

export default ({store, redirect}) => {
  return new Promise((resolve) => {
    firebase.auth().onAuthStateChanged(async user => {
      // Set service worker registered false as browser refresh
      store.dispatch("login/setServiceWorkerRegistered", false);
      store.dispatch("school/clearSchools");
      if (user) {
        try {
          var response = await axios.get(
            config.baseUrl + ApiEndpoints.SIGN_IN_BY_FIREBASE_UID,{
                params: {
                  firebaseUid: user.uid,
                }
            });
            store.dispatch("login/autoSignIn", response.data);
            console.log(redirect)
            redirect('/')
        } catch (error) {
          console.log("Error response ==>",error.response, error)
        }
      } else {
       //User session ended so clear user and location
        store.dispatch("location/clearLocation");
        store.dispatch("login/clearUser");
      }
      resolve()
    })
  })
}
