import React, { useState } from 'react'
import BackButton from '../../assets/AuthPage/arrow-left.svg'
import './SignUp.css'
import Submit from '../ReusableSubmitButton/Submit'
import SnackErrorAlert from '../Alerts/SnackErrorAlert'

interface Props {
    
}

const SignUp : React.FC<Props> = () => {

    const [firstName,setFirstName] = useState("");
    const [lastName,setLastName] = useState("");
    const [email,setEmail] = useState("");
    const [pass,setPass] = useState("");
    const [confirmPass,setConfirmPass] = useState("");


    return (
        <div className = "signUpMain">
            <div className="text">
                <ul>
                    <li>Sign In</li>
                    <li>to</li>
                </ul>
                <h3>Slip</h3>
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
                                <SnackErrorAlert displayMessage = "Please fill all the fields!" />
                            }
                        }

                    } />
                </form>
                <div>----or-----</div>
                <div className="googleSignUp">
                <Submit displayString= "SignUp with Google" validate = {()=>{}}/>
            </div>
            </div>
            
        </div>
    )
}

export default SignUp;