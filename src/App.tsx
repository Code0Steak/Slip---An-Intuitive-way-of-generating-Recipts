import React,{useState,useEffect} from 'react';
import './App.css';
import Landing from './components/LandingPage-HomePage/Landing';
import { BrowserRouter, Route } from 'react-router-dom';
import SignIn from './components/AuthPage/SignIn';
import SignUp from './components/AuthPage/SignUp';
import {auth} from './firebase/fire';


const App = () => {

  const [currentUser,setCurrentUser] = useState();

  let unsubscribe : () => any;

  useEffect(() => {
    unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
      console.log(currentUser);
    })

    return () => unsubscribe();
    
  }, [currentUser])

  return (
    <div className="App">
      <BrowserRouter> 

        <Route exact path={"/"} component = {Landing} />
        <Route path={"/signin"} component = {SignIn} />
        <Route path = {"/signup"} component = {SignUp} />
      </BrowserRouter>
      
    </div>
  );
}

export default App;
