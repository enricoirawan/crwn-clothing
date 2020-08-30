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

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
