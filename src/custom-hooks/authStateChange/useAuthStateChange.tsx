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
          const userID = createUserProfileDocument(user,null);
          
          setCurrentUser({...user,userID});
          console.log(userID);
        }
        else return;
        
        
      })
  
      return () => unsubscribe();
      
    }, [])
  

    return currentUser;
}
export default useAuthStateChange;