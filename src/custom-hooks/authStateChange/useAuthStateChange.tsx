import { useState,useEffect } from 'react'
import {auth, createUserProfileDocument} from '../../firebase/fire';

interface Props {
    
}

const useAuthStateChange = () : any => {

    const [currentUser,setCurrentUser] = useState();
    

    let unsubscribe : () => any;
  
    useEffect(() => {
     unsubscribe = auth.onAuthStateChanged(  (user : any) => {
        
        if(user){
          createUserProfileDocument(user,null);
          
          setCurrentUser({...user});
          console.log(user);
        }
      
      })
  
     return unsubscribe();
      
    }, [])
  
    return currentUser;
}
export default useAuthStateChange;