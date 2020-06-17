import React from 'react'
import BackButton from '../../assets/AuthPage/arrow-left.svg'

interface Props {
    
}

const SignIn : React.FC<Props> = () => {
    return (
        <div>
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
                    
                </form>
            </div>
        </div>
    )
}

export default SignIn;