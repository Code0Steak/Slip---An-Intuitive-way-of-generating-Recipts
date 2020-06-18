import React,{useState} from 'react'
import BackButton from '../../assets/AuthPage/arrow-left.svg'
import { Link } from 'react-router-dom';
import './SignIn.css'
import Submit from '../ReusableSubmitButton/Submit';
import SnackErrorAlert from '../Alerts/SnackErrorAlert';

interface Props {
    
}

const SignIn : React.FC<Props> = () => {

    const [email,setEmail] = useState("");
    const [pass,setPass] = useState("");

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



    //Regex for validation
    const emailRegex = /'^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$'/;
    

    return (
        <div className="signInMain">
            <div className="text">
                <ul>
                    <li>Sign In</li>
                    <li>to</li>
                </ul>
                <h3>Slip</h3>
                <div>Don't have an account <Link to="/signup">SignUp</Link></div>
            </div>
            <div className="back">
                <img src={BackButton} alt="" className = "backButtonSVG"/>
            </div>
            <div className="form">
                <form>
                   <input type = "text" placeholder="Email" onChange={e => setEmail(e.target.value)} /> 
                   <input type="password" placeholder="Password" onChange={e => setPass(e.target.value)} />
                   <Submit displayString= "Submit" validate = {

                        () => {
                            console.log("clicked");
                            
                            if(!(emailRegex.test(email))){
                                setOpen(true);
                                setDisplayMessage("Please enter a valid Email Address!");
                                setErrorType("error");
                            }
                            
                            
                        }

                        } />
                </form>
                
            <div>----or-----</div>
                <div className="googleSignIn">
                <Submit displayString= "SignIn with Google" validate = {()=>{}}/>
            </div>
            </div>
            <SnackErrorAlert open = {open} handleClose = {handleClose} displayMessage = {displayMessage} errorType = {errorType} />

        </div>
    )
}

export default SignIn;