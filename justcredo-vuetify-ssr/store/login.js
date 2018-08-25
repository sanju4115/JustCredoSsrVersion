import * as firebase from "firebase";
import db from "../services/firebaseInit";

export default {
  namespaced: true,
  state : () => ({
    user: null,
    loginError: null,
    serviceWorkerRegistered:false,
    loading:false,
    isUserAdmin:false
  }),

  mutations : {
    clearUser(state){
      state.user = null;
    },
    setUpdatedUser(state, payload){
      state.user = payload.data;
    },
    setUser(state, payload) {
      console.log("setUser")
      if (payload === null || payload === undefined) {
        state.user = null;
      } else {
        const docRef = db.collection("users").doc(payload.uid);
        docRef.get().then(doc => {
          if (doc.exists) {
            console.log(doc.data())
            state.user = doc.data();
            console.log(state.user)
          }else {
            //handleLocationError(false);
          }
        }).catch(function(error) {
          console.log("Shared index.js setUser error getting document:", error);
        });
      }
    },
    setLoginError(state, payload) {
      state.loginError = payload;
    },
    clearLoginError(state) {
      state.loginError = null;
    },
    setServiceWorkerRegistered(state,payload){
      state.serviceWorkerRegistered = payload;
    },
    setLoading(state, payload) {
      state.loading = payload;
    },
    setIsUserAdmin(state,payload){
      const docRef = db.collection("roles").doc(payload.uid);
      docRef.get().then(doc => {
        console.log("roles");
        state.isUserAdmin = doc.exists;
        console.log(state.isUserAdmin);
      }).catch((err) => {
        console.log('login/index.js setIsUserAdmin error getting documents', err);
        //handleLocationError(false);
      });
    },
  },
  actions  : {
    clearUser({ commit }){
      commit("clearUser");
    },
    setUser({ commit}, payload){
      commit("setUpdatedUser",payload);
    },
    signUserIn({ commit, state }, payload) {
      commit("setLoading", true);
      commit("clearLoginError");
      firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          commit("shared/setLoading", false);
          const newUser = {
            uid: user.uid
          };
          commit("shared/setUser", newUser);
          afterSignInUserSpecificTask(commit, state, newUser);
        })
        .catch(error => {
          commit("setLoading", false);
          commit("setLoginError", error);
        });
    },
    clearLoginError({ commit }) {
      commit("clearLoginError");
    },
    autoSignIn({ commit, state }, payload) {
      console.log("autosignin")
      commit("setLoading", false);
      commit("setUser", { uid: payload.uid });
      afterSignInUserSpecificTask(commit, state, payload)
    },
    setServiceWorkerRegistered({ commit},payload){
      commit("setServiceWorkerRegistered",payload);
    },
    setIsUserAdmin({ commit},payload){
      commit("setIsUserAdmin",payload);
    },
    logout({ commit }) {
      firebase.auth().signOut();
      commit("setUser", null);
    }
  },
  getters : {
    loginError(state) {
      return state.loginError;
    },
    user(state) {
      return state.user;
    },
    loading(state) {
      return state.loading;
    },
    isUserAdmin(state){
      return state.isUserAdmin;
    },
  }
}

export const getters = {
  loginError(state) {
    return state.loginError;
  },
  user(state) {
    return state.user;
  },
  loading(state) {
    return state.loading;
  },
  isUserAdmin(state){
    return state.isUserAdmin;
  },
};

function afterSignInUserSpecificTask(commit, state, user) {
  /**
   * Build notification service
   * 1. Request Permission
   * 2. Save token in db
   * @type {firebase.messaging.Messaging | *}
   */
  const FIREBASE_MESSAGING = firebase.messaging();
  console.log("service worker registered","==>",state.serviceWorkerRegistered);
  if (!state.serviceWorkerRegistered){
    navigator.serviceWorker.register('/js/firebase-messaging-sw.js')
      .then((registration) => {
        FIREBASE_MESSAGING.useServiceWorker(registration);
        commit("setServiceWorkerRegistered", true);
        FIREBASE_MESSAGING.requestPermission()
          .then(() => {
            FIREBASE_MESSAGING.getToken().then(token => {
              db.collection("notification_tokens").doc(user.uid).set({
                token: token,
                uid: user.uid
              }).then(()=>{

              }).catch(err=>{
                console.log("Shared/index.js error in registering service worker",err);
              });
              console.log(`The token is ${token}`)
            });
          });
      })
      .catch(err => {
        console.log(err)
      });
  }else {
    FIREBASE_MESSAGING.getToken().then(token => {
      db.collection("notification_tokens").doc(user.uid).set({
        token: token,
        uid: user.uid
      }).then(()=>{

      }).catch(err=>{
        console.log("Shared/index.js error in registering service worker",err);
      });
      console.log(`The token is ${token}`)
    });
  }

  /**
   * Check user is admin or not
   * 1. if admin set in store admin field true
   * 2. otherwise false
   *
   */
  commit("setIsUserAdmin", user);
}
