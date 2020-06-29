import React from 'react';
import './App.css';
import Landing from './components/LandingPage-HomePage/Landing';
import { BrowserRouter, Route } from 'react-router-dom';
import SignIn from './components/AuthPage/SignIn';
import SignUp from './components/AuthPage/SignUp';
import Home from './components/HomePage/Home';


const App = () => {

  return (
    <div className="App">
      <BrowserRouter> 

        <Route exact path={"/"} component = {Landing} />
        <Route exact path={"/signin"} component = {SignIn} />
        <Route exact path = {"/signup"} component = {SignUp} />
        <Route exact path = {"/home"} component = {Home} />
      </BrowserRouter>
      
    </div>
  );
}

export default App;
