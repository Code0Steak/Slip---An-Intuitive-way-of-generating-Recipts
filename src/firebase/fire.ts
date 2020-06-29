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
export const signInWithGoogle = async () => {
  let res:any;
  await auth.signInWithRedirect(provider);

  await auth.getRedirectResult().then(result => {res = result}).catch(error => console.log(error));
  console.log(res);
  return res;

}

//Cloud Firestore Storage 
// const storage = firebase.storage();

//Export the entire firebase lib
export default firebase;

export const createUserProfileDocument = async (userAuth : any, additionalData : any) => {
  if(!userAuth) return;

  const userRef = firestore.doc(`Users/${userAuth.uid}`);
  userRef.onSnapshot(snapShot => {
      if(!snapShot.exists){
        if(userAuth.password){
          const {displayName, email, photoURL, password} = userAuth;
          const createdAt = new Date();
          const signInMethod = 'email and password'
          try{
            userRef.set({
              displayName, email, createdAt, photoURL, password , signInMethod,...additionalData
            })
          }
          catch(error){
            console.log(`Error creating User Account : ${error.message}`);
          }
      }
      else {
  
          const {displayName, email, photoURL} = userAuth;
          const createdAt = new Date();
          const password = '';
          const signInMethod = 'google signin';
          try{
            userRef.set({
              displayName, email, createdAt, photoURL,password, signInMethod,...additionalData
            })
          }
          catch(error){
            console.log(`Error creating User Account : ${error.message}`);
          }
    }
  }
    console.log(snapShot.id,userAuth);

  
  });

}

  // let newSnapShot : {id:string;data: any};


// export const SignUp = (email : string, pass : string) => {

    
//     firebase.auth().createUserWithEmailAndPassword(email, pass).catch(function(error) {
//         // Handle Errors here.
//         var errorCode = error.code;
//         var errorMessage = error.message;
//         // ...
//       });

// }
/* Current user */
export const getCurrentUser = () => {
  const user = auth.currentUser;
  if(user) return user;
  else return;
}


/* Update */
//Update Display Name


export const updateDisplayName = (name : string) => {
  let user = firebase.auth().currentUser;
  
  if(user){
  
      user.updateProfile({
        displayName: `${name}`,
      }).then(() => {
        console.log('success');
      }).catch((error) => {
        
        console.log(error);
      });

      const res = firestore.collection('Users').doc(`${user.uid}`).update({
        displayName : `${name}`
      })

  }
} 