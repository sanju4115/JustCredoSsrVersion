import * as firebase from "firebase";
import db from "../services/firebaseInit";
import config from "@/config.js";
import axios from "axios";
import ApiEndpoints from "@/constants/ApiEndpoints";


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
      state.user = payload;
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
      return new Promise(async (resolve, reject) => {
        commit("setLoading", true);
        commit("clearLoginError");
        try {
          let user = await firebase
          .auth()
          .signInWithEmailAndPassword(payload.email, payload.password);
        } catch (error) {
          commit("setLoginError", error);
          reject();
        }
        commit("setLoading", false);
        resolve();
      });
    },

    clearLoginError({ commit }) {
      commit("clearLoginError");
    },

    autoSignIn({ commit, state }, payload) {
      commit("setLoading", false);
      commit("setUser", payload);
      //afterSignInUserSpecificTask(commit, state, payload)
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
