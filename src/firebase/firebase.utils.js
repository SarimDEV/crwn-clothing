import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyCrz_qMfVez-KEQlZvZTuApNyjHiuTK4-0",
  authDomain: "crwn-db-2bc93.firebaseapp.com",
  databaseURL: "https://crwn-db-2bc93.firebaseio.com",
  projectId: "crwn-db-2bc93",
  storageBucket: "crwn-db-2bc93.appspot.com",
  messagingSenderId: "649361387906",
  appId: "1:649361387906:web:bbdc6a116a5b8a4eaf1f9b",
  measurementId: "G-HHF1Q0SQKL",
};

export const createUserProfileDocument = async(userAuth, additionalData) => {
  if(!userAuth) return

  const userRef = firestore.doc(`user/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
