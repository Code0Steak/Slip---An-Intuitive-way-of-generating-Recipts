import { useState,useEffect } from 'react'
import {auth, createUserProfileDocument} from '../../firebase/fire';

interface Props {
    
}

const useAuthStateChange = () : any => {

    const [currentUser,setCurrentUser] = useState();
    

    let unsubscribe : () => any;
  
    useEffect(() => {
     unsubscribe = auth.onAuthStateChanged( async (user : any) => {
        
        if(user){
          await createUserProfileDocument(user,null);
          
          setCurrentUser({...user});
          console.log(user);
        }
        else return;
        
        
      })
  
      return () => unsubscribe();
      
    }, [])
  
    return currentUser;
}


export default useAuthStateChange;