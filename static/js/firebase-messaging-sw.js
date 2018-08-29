/**
 * Give the service worker access to Firebase Messaging.
 * Note that you can only use Firebase Messaging here, other Firebase libraries
 * are not available in the service worker.
 *
 */
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');
//import firebaseConfig from '/src/components/firebaseConfig.js';

const firebaseConfig = {
  apiKey: "AIzaSyARUd-8gcBzIM41BSFPGnr6yyhWxjphcUs",
  authDomain: "credo-f7d83.firebaseapp.com",
  databaseURL: "https://credo-f7d83.firebaseio.com",
  projectId: "credo-f7d83",
  storageBucket: "credo-f7d83.appspot.com",
  messagingSenderId: "916941463029"
};

firebase.initializeApp(firebaseConfig);
firebase.messaging();
