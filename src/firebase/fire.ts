// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDa8GoDHq0rSnvSGIb6LbK5A9MhTv2zMtk",
    authDomain: "slip-auth.firebaseapp.com",
    databaseURL: "https://slip-auth.firebaseio.com",
    projectId: "slip-auth",
    storageBucket: "slip-auth.appspot.com",
    messagingSenderId: "92614925837",
    appId: "1:92614925837:web:ba97734a77c87e01f77f44",
    measurementId: "G-B7T2JZRC0D"
  };

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

// export const SignUp = (email : string, pass : string) => {

    
//     firebase.auth().createUserWithEmailAndPassword(email, pass).catch(function(error) {
//         // Handle Errors here.
//         var errorCode = error.code;
//         var errorMessage = error.message;
//         // ...
//       });

// }
