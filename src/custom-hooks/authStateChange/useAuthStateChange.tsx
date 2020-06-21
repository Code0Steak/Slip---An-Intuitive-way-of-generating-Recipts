import { useState,useEffect } from 'react'
import {auth} from '../../firebase/fire';

interface Props {
    
}

const useAuthStateChange = () => {

    const [currentUser,setCurrentUser] = useState();


    let unsubscribe : () => any;
  
    useEffect(() => {
      unsubscribe = auth.onAuthStateChanged((user : any) => {
        setCurrentUser(user);
        console.log(currentUser);
      })
  
      return () => unsubscribe();
      
    }, [currentUser])
  

    return currentUser;
}
export default useAuthStateChange;