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

//For SignIn/SignUp with Google
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);


//Export the entire firebase lib
export default firebase;

export const createUserProfileDocument = async (userAuth : any, additionalData : any) => {
  if(!userAuth) return;

  const userRef = firestore.doc(`Users/${userAuth.uid}`);
  const snapShot = await userRef.get();
  console.log(snapShot);

  if(!snapShot.exists){
    const {displayName, email} = userAuth;
    const createdAt = new Date();

    try{
      await userRef.set({
        displayName, email, createdAt, ...additionalData
      })
    }
    catch(error){
      console.log(`Error creaing error : ${error.message}`);
    }

  }

  return userRef;

}

// export const SignUp = (email : string, pass : string) => {

    
//     firebase.auth().createUserWithEmailAndPassword(email, pass).catch(function(error) {
//         // Handle Errors here.
//         var errorCode = error.code;
//         var errorMessage = error.message;
//         // ...
//       });

// }
