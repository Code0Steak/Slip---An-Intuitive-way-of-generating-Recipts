import React,{useState, useEffect} from 'react';

import './Home.css';

import dev from '../../assets/LandingPage/miroodles.png';
import hazzleFree from '../../assets/LandingPage/miroodles-hazzleFree.png';
import laptopHand from '../../assets/LandingPage/miroodles-laptop-hand.png';

import { useSpring, animated } from 'react-spring'
import {  useHistory } from 'react-router-dom';
import useAuthStateChange from '../../custom-hooks/authStateChange/useAuthStateChange';

import Popover from '@material-ui/core/Popover';
import SnackErrorAlert from '../Alerts/SnackErrorAlert';
import {auth,updateDisplayName} from '../../firebase/fire';

import AddAPhotoTwoToneIcon from '@material-ui/icons/AddAPhotoTwoTone';
import TextField from '@material-ui/core/TextField';

interface Props {
    
}

const Home : React.FC<Props> = ()=>{

    const [state, toggle] = useState(true);
    const { x } = useSpring({ from: { x: 0 }, x: state ? 1 : 0, config: { duration: 1000 } })
    

  //User Auth  
  const currentUser = useAuthStateChange();
  console.log(currentUser); 
  
  //routes
  const history = useHistory();

  //popover
  const [anchorEl, setAnchorEl] = React.useState<HTMLImageElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLImageElement>) => {
    setAnchorEl(event.currentTarget);
    setOpenAlert(true);
    setDisplayMessage("Double Click on a Field to Edit it!");
    setErrorType("info");
    console.log("clicked")
  };

  const handleClose = async () => {
    
    setAnchorEl(null);

    //Updates

    if(displayName != '' && displayName != currentUser.displayName ){
      console.log(displayName);
      updateDisplayName(displayName);
    }

    //Clear out snackbar fields
    setOpenAlert(false);
    setDisplayMessage('');
    setErrorType('');
    //Clear error field
    setError(true);
    
    //Clear profile data
    // setPhotoURL('');
    // setDisplayName('');
    // setEmail('');
    // setPassword('');
    // setConformPassword('');

  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
   

  /* Profile */

    //Profile Data
    const [photoURL,setPhotoURL] = useState('');
    const [displayName,setDisplayName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [confirmPassword,setConformPassword] = useState('');

    //Profile Enable Fields
    const [showMore,setShowMore] = useState(false);
    const [enableNameEditingOnDoubleClick,setEnableNameEditingOnDoubleClick] = useState(false);
    const [enableEmailEditingOnDoubleClick,setEnableEmailEditingOnDoubleClick] = useState(false);
    const [showPasswordField,setShowPasswordField] = useState(false);
    const renderPasswordField = () => {
      setShowPasswordField(!showPasswordField);
      
      setOpenAlert(true);
      setDisplayMessage("To change your Email you need to set a Password!");
      setErrorType("info");
  }

  /*Error and Regex*/
  const [err,setError] = useState(true);
  //Email Regex Validation
 
  const emailValidation = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {

    setEmail(e.target.value);
    if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)){
      setOpenAlert(true);
      setDisplayMessage("Please enter a valid Email Address!");
      setErrorType("error");
    }else{
      setOpenAlert(false);
      setDisplayMessage("");
      setErrorType("");
      setError(false);
    }

  }

  //Password Regex Validation
  const passwordValidation = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {

    setPassword(e.target.value);
    if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/i.test(password)){
      setOpenAlert(true);
      setDisplayMessage("Please set a Password with minimum eight characters, at least one uppercase letter, one lowercase letter and one number");
      setErrorType("error");
    }else{
      setOpenAlert(false);
      setDisplayMessage("");
      setErrorType("");
      setError(false);
    }

  }

  //Confirm Password
  const passwordMatchCheck = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {

    setConformPassword(e.target.value);
    if(!(password === confirmPassword)){
      setOpenAlert(true);
      setDisplayMessage("Password's don't match!");
      setErrorType("error");
    }else{
      setOpenAlert(false);
      setDisplayMessage("");
      setErrorType("");
      setError(false);
    }

  }

  //Profile Alert
  //Snackbar declarations
  const [openAlert,setOpenAlert] = useState(false);
  const [displayMessage,setDisplayMessage] = useState('');
  const handleCloseAlert = (event?: React.SyntheticEvent, reason?: string) => {
      if (reason === 'clickaway') {
        return;
      }

      setOpenAlert(false);
      setDisplayMessage('');
      setErrorType('');
      
    };
  const [errorType,setErrorType] = useState('');

    return (currentUser) ? (
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
                    <li>Notifications</li>
                    
                    <li>|</li>
                    <li>
     
      <img src={`${currentUser.photoURL}`} alt={`${currentUser.displayName} - Profile`}  className = "profileIMG"  aria-describedby={id} onClick={handleClick} />
                           
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}

              > 
             
            { (currentUser.password) ? (<div>Hello</div>) :(  <div className="profilePopover">
        <ul>
          <li><img src={`${currentUser.photoURL}`} alt="" className = "changeProfileIMG" />
          <AddAPhotoTwoToneIcon />
          </li>
            <li>
              
            <TextField
            disabled = {(enableNameEditingOnDoubleClick) ? false : true }
            id= "outline-disabled-name" 
            label="Name"
            defaultValue= { (displayName) ? displayName : currentUser.displayName}
          
            onDoubleClick = {()=> setEnableNameEditingOnDoubleClick(!enableNameEditingOnDoubleClick)}
            onChange = {(e) => setDisplayName(e.target.value)}

          />   
              </li>
        <li>
        <TextField
            disabled = {(enableEmailEditingOnDoubleClick) ? false : true }
            id="outlined-disabled-email"
            label="Email"
            defaultValue= {currentUser.email}
            

            onDoubleClick = {()=> { 
              
              setEnableEmailEditingOnDoubleClick(!enableEmailEditingOnDoubleClick);
              
              renderPasswordField();
              
            
            }}

            onChange = {(e) => emailValidation(e)}

          /> 
          {(showPasswordField && enableEmailEditingOnDoubleClick) &&<>  <TextField
            
            id="set-password"
            label="Password"
            type = "password"
            defaultValue= ''
            onChange = {(e) => passwordValidation(e) }
            // onFocus = {()=> {    
            //     setOpenAlert(true);
            //     setDisplayMessage("Your Password should have minimum eight characters, at least one uppercase letter, one lowercase letter and one number");
            //     setErrorType("info");}}
          /> 
          
          <TextField
            
            id="set-confirm-password"
            label="Confirm Password"
            type = "password"
            defaultValue= ''
            onChange = {(e) => passwordMatchCheck(e)}
          /> 
          </>
          }
          
          </li>
        <div>
          <li><input type="submit" value={(showMore) ? 'Hide' : 'More'} onClick = {() => setShowMore(!showMore) } /></li>
          {(showMore) && (<div> 
            <div> Danger Zone <li>Delete Account</li> </div>
          </div>)  }
          <li><input type="submit" value="Sign Out" onClick = {
                        async () => {
                        let res : any;
                        let err : any;
                         auth.signOut().then(result => {res = result}).catch(error=>{err = error});
                         if(!err) history.replace('/');
                        } 
                         } /></li>
        </div>
        </ul>

    </div>)}
              </Popover></li>
                </ul>
            </div>

            <div className="title">The most Intuitive way of creating recipts...</div>

            <div onClick = {() =>{ toggle(!state); history.replace('/createNewDataStore/')} } className="newDataStore">

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
            <SnackErrorAlert open = {openAlert} handleClose = {handleCloseAlert} displayMessage = {displayMessage} errorType = {errorType} />
        </div>
    )

    : 

    (
        <div>Loading...</div>
    )

     
}

export default Home;