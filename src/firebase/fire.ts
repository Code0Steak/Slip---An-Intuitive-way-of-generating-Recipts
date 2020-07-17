// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from "firebase/app";
import "firebase/storage";
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

//reference to storage service
export const storage = firebase.storage();

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

//SignUp with Email and Password
export const signUpWithEmailAndPassword = async (firstName: string,lastName: string,email: string,password: string) => {
  let res : any;
  auth.createUserWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
   
    // ...
    res = error.message;
  });

  if(!res) {
    let currentUser = auth.currentUser;
    let currentUserUid : any;
    if(currentUser != null){
      currentUser.providerData.forEach(function (profile : any) {
          currentUserUid = profile.uid;
          console.log(profile.uid);
          console.log("Sign-in provider: " + profile.providerId);
          console.log("  Provider-specific UID: " + profile.uid);
          console.log("  Name: " + profile.displayName);
          console.log("  Email: " + profile.email);
          console.log("  Photo URL: " + profile.photoURL);
      })
    }

    const userRef = firestore.doc(`Users/${currentUserUid}`);
    const snapShot = await userRef.get();
    console.log(snapShot.id,currentUserUid);

    if(!snapShot.exists){

      const createdAt = new Date();
      const displayName = firstName + lastName;
      const photoURL = '';
      try{
        await userRef.set({
          displayName, email,createdAt,photoURL
        })
      }
      catch(error){
        console.log(error.message);
        res = error.message;
      }

    }
  }
  return res;
}

//SignIn with Email and Password


//Cloud Firestore Storage 
// const storage = firebase.storage();

//Export the entire firebase lib
export default firebase;

export const createUserProfileDocument = async (userAuth : any, additionalData : any) => {
  if(!userAuth) return;

  const userRef = firestore.doc(`Users/${userAuth.uid}`);
  const snapShot = await userRef.get();
  console.log(snapShot.id,userAuth);

  if(!snapShot.exists){

    if(userAuth.password){
      const {displayName, email, photoURL, password} = userAuth;
      const createdAt = new Date();
      const signInMethod = 'email and password'
      try{
        await userRef.set({
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
          await userRef.set({
            displayName, email, createdAt, photoURL,password, signInMethod,...additionalData
          })
        }
        catch(error){
          console.log(`Error creating User Account : ${error.message}`);
        }
  }

  }

  // let newSnapShot : {id:string;data: any};

 
}

// export const SignUp = (email : string, pass : string) => {

    
//     firebase.auth().createUserWithEmailAndPassword(email, pass).catch(function(error) {
//         // Handle Errors here.
//         var errorCode = error.code;
//         var errorMessage = error.message;
//         // ...
//       });

// }


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

export const updateEmail = (e : string,pass: string) => {
  let user = firebase.auth().currentUser;

  if(user){
    user.updateEmail(e).then(function() {
      // Update successful.
      console.log('success');
    }).catch(function(error) {
      // An error happened.
      console.log('error');
    });

    user.updatePassword(pass).then(function() {
      // Update successful.
      console.log('success');
    }).catch(function(error) {
      // An error happened.
      console.log(error);
    });

  }

}


/* Create Storage */
export const storeImage = (imageFile : any) => {

  const user = auth.currentUser;
  if(user){

    //Create a storage reference
    const storageRef = storage.ref().child(`${user.uid}/` + imageFile.name );
    //Upload file
    let task = storageRef.put(imageFile);
    
    return task;
    
  }
}

/* Create New Data Store */

export const createNewDataStoreNoGroupItems = (shopName : string,ob : any) => {

  const user= auth.currentUser;
  let err : any;
  if(user){
  firestore.collection("Shops").doc(`${user.uid}`).collection(`${shopName}`).doc('noGroupItems').set(ob).then(() => err = "Feed Data Table Pushed").catch((error) => err = error.message);

  }
  else{
    err = "No User Found"
  }
  return err;
} 

export const createNewDataStoreDataFields = (shopName : string,ob : any) => {
  const user= auth.currentUser;
  let err : any;
  if(user){
  firestore.collection("Shops").doc(`${user.uid}`).collection(`${shopName}`).doc('dataFields').set(ob).then(() => err = "Data Fields for the Table Pushed").catch((error) => err = error.message);

  }
  else{
    err = "No User Found"
  }
  return err;
}

export const createNewDataStoreTaxFields = (shopName : string,ob : any) => {
  const user= auth.currentUser;
  let err : any;
  if(user){
  firestore.collection("Shops").doc(`${user.uid}`).collection(`${shopName}`).doc('taxFields').set(ob).then(() => err = "Tax Data Pushed").catch((error) => err = error.message);

  }
  else{
    err = "No User Found"
  }
  return err;
}

export const createNewDataStoreCurrency = (shopName : string,ob : any) => {

  const user= auth.currentUser;
  let err : any;
  if(user){
  firestore.collection("Shops").doc(`${user.uid}`).collection(`${shopName}`).doc('currency').set(ob).then(() => err = `Currency set to ${ob}`).catch((error) => err = error.message);

  }
  else{
    err = "No User Found"
  }
  return err;

}