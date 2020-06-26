import React,{useState, useEffect} from 'react';

import './Landing.css';

import dev from '../../assets/LandingPage/miroodles.png';
import hazzleFree from '../../assets/LandingPage/miroodles-hazzleFree.png';
import laptopHand from '../../assets/LandingPage/miroodles-laptop-hand.png';

import { useSpring, animated } from 'react-spring'
import { Link } from 'react-router-dom';

import {auth} from '../../firebase/fire';
import useAuthStateChange from '../../custom-hooks/authStateChange/useAuthStateChange';
import firebase from '../../firebase/fire';

interface Props {
    
}

const Landing : React.FC<Props> = ()=>{

    const [state, toggle] = useState(true);
    const { x } = useSpring({ from: { x: 0 }, x: state ? 1 : 0, config: { duration: 1000 } })
    

  //User Auth  
  const currentUser = useAuthStateChange();
    console.log(currentUser); 
    

    //Check if Firebase is Initialized
    // const [firebaseInitialized,setFirebaseInitialized] = useState(false);

    

    return (
        <div className="landingMain">
            <div className = "name">Slip</div>

            <div className = "docLinks">
                <ul>
                    <li>Getting Started Guide</li>
                    <li>Features</li>
                    <li>Roadmap</li>
                </ul>
            </div>

            <div className="devContact">
                <ul>
                    <li>Leave a Message</li>
                    <li>Developer Contact</li>
                </ul>
                <img src={dev} alt="" className= "devPNG"/>
            </div>

            <div className="vl"></div>

            <div className="authDiv">
                <ul className = "authUl">
                    {(currentUser) ? 
                    <>
                        <li>Notifications</li>
                        <li>|</li>
                        <li>{currentUser.displayName}</li>
                        <li>|</li>
                        <li onClick = {() => auth.signOut() }>SignOut</li>
                        <li>|</li>
                        <li><img src={`${currentUser.photoURL}`} alt=""/></li>
                    </> :
                    <>
                        <li><Link to="/signin">Sign In</Link></li>
                        <li>|</li>
                        <li className="signUp"><Link to="/signup">SignUp</Link></li>
                    </>}
                    
                </ul>
            </div>

            <div className="title">The most Intuitive way of creating recipts...</div>

            <div onClick = {() => toggle(!state)} className="newDataStore">

            <animated.div
        style={{
          opacity: x.interpolate({ range: [0, 1], output: [0.9, 1] }),
          transform: x
            .interpolate({
              range: [0, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 1],
              output: [1, 0.97, 0.9, 1.1, 0.9, 1.1, 1.03, 1]
            })
            .interpolate(x => `scale(${x})`)
        }}>


                <div className="newDataStoreButton">
                    <ul>
                        <li>Create a New Data Store</li>
                        <li>+</li>
                    </ul>
                    <img src={laptopHand} alt="" className="laptopHandPNG"/>
                </div>

        </animated.div>

            </div>

            <div className="para">
                    <ul>
                        <li> Is writing recipts your day-to-day chore? For how long are you gonna write recipts and manage them the traditional way?</li>
                        <li>Try out <b>Slip</b> the most intuitive way of creating, storing and managing your recipts. I bet you will not go back.</li>  
                        <li>Creating a new Data Store and getting started with a digital recipt is as easy as clicking the <b>Create a New Data Store</b> button in front of you. </li> 
                        <li>Get started now! Read the <b>Getting Started Guide</b> for more info!</li>
                        <li><img src={hazzleFree} alt="" className="hazzleFreePNG"/></li>
                    </ul>
                    
            </div>

        </div>
    )

     
}

export default Landing;