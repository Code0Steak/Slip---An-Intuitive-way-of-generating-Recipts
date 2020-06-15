import React from 'react';
import './App.css';
import Landing from './components/LandingPage-HomePage/Landing';
import { BrowserRouter, Route } from 'react-router-dom';
import SignIn from './components/AuthPage/SignIn';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter> 

        <Route exact path={"/"} component = {Landing} />
        <Route path={"/signin"} component = {SignIn} />
      </BrowserRouter>
      
    </div>
  );
}

export default App;
