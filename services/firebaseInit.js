import * as firebase from 'firebase';
import 'firebase/firestore';
import firebaseConfig from './firebaseConfig';
const firebaseApp = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : '';
export default firebaseApp.firestore();
