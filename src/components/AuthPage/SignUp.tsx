import React, { useState } from 'react'
import BackButton from '../../assets/AuthPage/arrow-left.svg'
import './SignUp.css'
import Submit from '../ReusableSubmitButton/Submit';
import SnackErrorAlert from '../Alerts/SnackErrorAlert';
import { Link, useHistory } from 'react-router-dom';
import { signInWithGoogle, auth, createUserProfileDocument, signUpWithEmailAndPassword } from '../../firebase/fire';


interface Props {
    
}

const SignUp : React.FC<Props> = () => {

    const [firstName,setFirstName] = useState("");
    const [lastName,setLastName] = useState("");
    const [email,setEmail] = useState("");
    const [pass,setPass] = useState("");
    const [confirmPass,setConfirmPass] = useState("");

    //Snackbar declarations
    const [open,setOpen] = useState(false);
    const [displayMessage,setDisplayMessage] = useState('');
    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
        setDisplayMessage('');
        setErrorType('');
      };
    const [errorType,setErrorType] = useState('');
   
    //routing
    const history = useHistory();

    return (
        <div className = "signUpMain">
            <div className="text">
                <ul>
                    <li>Sign In</li>
                    <li>to</li>
                </ul>
                <h3>Slip</h3>
                <div>Have an account? <Link to = "/signin">SignIn</Link></div>
            </div>
            <div className="back">
                <img src={BackButton} alt="" className = "backButtonSVG"/>
            </div>
            <div className="form">
                <form>
                    <input type="text" placeholder = "First Name" onChange = {(e)=> setFirstName(e.target.value)} />
                    <input type="text" placeholder = "Last Name" onChange = {(e) => setLastName(e.target.value)} />
                    <input type="text" placeholder = "Email" onChange = {(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder = "Password" onChange = {(e) => setPass(e.target.value)} />
                    <input type="password" placeholder = "Confirm Password" onChange = {(e) => setConfirmPass(e.target.value)} />
                    <Submit displayString= "Submit" validate = {

                        () => {
                            console.log("clicked");
                            if(firstName === "" || lastName === "" || email === "" || pass === "" || confirmPass === ""){
                               setOpen(true);
                               setDisplayMessage("Please fill in all the fields!");
                               setErrorType("error");
                            }
                            else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)){
                                setOpen(true);
                                setDisplayMessage("Please enter a valid Email Address!");
                                setErrorType("error");
                            }
                            else if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/i.test(pass)){
                                setOpen(true);
                                setDisplayMessage("Your Password should have minimum eight characters, at least one uppercase letter, one lowercase letter and one number");
                                setErrorType("error");
                            }
                            else if(!(pass === confirmPass)){
                                setOpen(true);
                                setDisplayMessage("Password's do not match!");
                                setErrorType("error");
                            }
                            else{
                                let res  = signUpWithEmailAndPassword(firstName,lastName,email,pass);
                                console.log(res);
                                if(!res) history.replace('/home');
                            }
                            
                            
                        }

                    } />
                </form>
                <div>----or-----</div>
                <div className="googleSignUp">
                <Submit displayString= "SignUp with Google" validate = {async ()=>{
                    let res = signInWithGoogle();
                    console.log(res);
                    if(res) history.replace('/home');
                }}/>
            </div>
            </div>
            <SnackErrorAlert open = {open} handleClose = {handleClose} displayMessage = {displayMessage} errorType = {errorType} />
        </div>
    )
}

export default SignUp;