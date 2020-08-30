import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyCHLFe058n_CSTI6d19VII-R7NmgW6UCBQ",
  authDomain: "crwn-db-245da.firebaseapp.com",
  databaseURL: "https://crwn-db-245da.firebaseio.com",
  projectId: "crwn-db-245da",
  storageBucket: "crwn-db-245da.appspot.com",
  messagingSenderId: "511875871054",
  appId: "1:511875871054:web:90762d0f441cdbd5edae1f",
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
