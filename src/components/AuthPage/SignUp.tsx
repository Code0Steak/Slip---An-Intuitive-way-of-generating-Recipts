import React from 'react'
import BackButton from '../../assets/AuthPage/arrow-left.svg'
import './SignUp.css'
import Submit from '../ReusableSubmitButton/Submit'

interface Props {
    
}

const SignUp : React.FC<Props> = () => {
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
                    <input type="text" placeholder = "First Name" />
                    <input type="text" placeholder = "Last Name" />
                    <input type="text" placeholder = "Email" />
                    <input type="text" placeholder = "Password" />
                    <input type="text" placeholder = "Confirm Password" />
                    <Submit displayString= "Submit" />
                </form>
                <div>----or-----</div>
                <div className="googleSignUp">
                <Submit displayString= "SignUp with Google" />
            </div>
            </div>
            
        </div>
    )
}

export default SignUp;