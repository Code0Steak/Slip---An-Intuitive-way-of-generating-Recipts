import React from 'react'
import LinearDeterminateLoader from '../../Loader/DeterminateLoader/LinearDeterminateLoader'
import Submit from '../../ReusableSubmitButton/Submit'

interface Props {
    saveInState : (e : React.ChangeEvent<HTMLInputElement>) => any;
}

const ImageDialogueContent : React.FC<Props> = ({saveInState}) => {
    return (
        <div>
            <LinearDeterminateLoader />
            <div><Submit displayString = {<input type = "file" onChange = {(e) => saveInState(e)}/>} validate = {()=>{}} /></div>
        </div>
    )
}

export default ImageDialogueContent;