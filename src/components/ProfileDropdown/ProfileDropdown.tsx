import React,{useState} from 'react'
import './ProfileDropdown.css'

import AddAPhotoTwoToneIcon from '@material-ui/icons/AddAPhotoTwoTone';
import TextField from '@material-ui/core/TextField';
import SnackErrorAlert from '../Alerts/SnackErrorAlert';


interface Props {
    photoURL : string;
    displayName : string;
    email : string;
    password : string;
}

const ProfileDropdown : React.FC<Props> = ({photoURL,displayName,email,password}) => {

    //Profile Data
  const [showMore,setShowMore] = useState(false);
  const [enableNameEditingOnDoubleClick,setEnableNameEditingOnDoubleClick] = useState(false);
  const [enableEmailEditingOnDoubleClick,setEnableEmailEditingOnDoubleClick] = useState(false);
  const [showPasswordField,setShowPasswordField] = useState(false);


    //Snackbar declarations
  const [openAlert,setOpenAlert] = useState(false);
  const [displayMessage,setDisplayMessage] = useState('');
  const handleCloseAlert = (event?: React.SyntheticEvent, reason?: string) => {
      if (reason === 'clickaway'||reason === 'force') {
        return;
      }
      setOpenAlert(false);
        setDisplayMessage('');
        setErrorType('');
      
    };
  const [errorType,setErrorType] = useState('');

    const renderPasswordField = () => {
        setShowPasswordField(!showPasswordField);
        if(openAlert) {
        handleCloseAlert('force');
        }
        setOpenAlert(true);
        setDisplayMessage("To change your Email you need to set a Password!");
        setErrorType("info");
    }

    return (password) ? (

        <div>Hello</div>

    ) : ( <>
        <div className="profilePopover">
        <ul>
          <li><img src={`${photoURL}`} alt="" className = "changeProfileIMG" />
          <AddAPhotoTwoToneIcon />
          </li>
            <li>
              
            <TextField
            disabled = {(enableNameEditingOnDoubleClick) ? false : true }
            id= "outline-disabled-name" 
            label="Name"
            defaultValue= {displayName}
          
            onDoubleClick = {()=> setEnableNameEditingOnDoubleClick(!enableNameEditingOnDoubleClick)}
            
          />   
              </li>
        <li>
        <TextField
            disabled = {(enableEmailEditingOnDoubleClick) ? false : true }
            id="outlined-disabled-email"
            label="Email"
            defaultValue= {email}
            

            onDoubleClick = {()=> { 
              
              setEnableEmailEditingOnDoubleClick(!enableEmailEditingOnDoubleClick);
              
              renderPasswordField();
              
            
            }}

          /> 
          {(showPasswordField && enableEmailEditingOnDoubleClick) &&<>  <TextField
            
            id="set-password"
            label="Password"
            defaultValue= ''
            onFocus = {()=> {
             
             if(openAlert){   
            setOpenAlert(false);
            setDisplayMessage('');
            setErrorType('');
                        }
                
                setOpenAlert(true);
                setDisplayMessage("Your Password should have minimum eight characters, at least one uppercase letter, one lowercase letter and one number");
                setErrorType("info");}}
          /> 
          
          <TextField
            
            id="set-password"
            label="Confirm Password"
            defaultValue= ''
            
          /> 
          </>
          }
          
          </li>
        <div>
          <li><input type="submit" value={(showMore) ? 'Hide' : 'More'} onClick = {() => setShowMore(!showMore) } /></li>
          {(showMore) && (<div> 
            <div> Danger Zone <li>Delete Account</li> </div>
          </div>)  }
        </div>
        </ul>

    </div>
    <div>            <SnackErrorAlert open = {openAlert} handleClose = {handleCloseAlert} displayMessage = {displayMessage} errorType = {errorType} />
</div>
    </>
    )
}

export default ProfileDropdown;