import React from 'react'
import './TaxFieldsPage.css'
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';
import RemoveCircleTwoToneIcon from '@material-ui/icons/RemoveCircleTwoTone';
import AddBoxTwoToneIcon from '@material-ui/icons/AddBoxTwoTone';

import ArrowRightAltTwoToneIcon from '@material-ui/icons/ArrowRightAltTwoTone';
import Submit from '../../ReusableSubmitButton/Submit';


interface Props {
    taxFields : Array<string>;
    taxHash : Array<number>;
    taxValues : Array<string>;
    removeTaxField : (index : number) => any;
    addTaxField : () => any;
    writeFieldValue : (value : string, index : number) => any;
    writeTaxValue : (value : string, index : number) => any;
    skipStep: boolean;
    handleSkip: () => any;
    printSubmission: () => any;
}

const TaxFieldsPage : React.FC<Props> = ({taxFields,taxHash,taxValues,removeTaxField,addTaxField,writeFieldValue,writeTaxValue,skipStep,handleSkip,printSubmission}) => {
    return (
        <div className = "taxFieldsPageMain">
            
            <div className="taxSideBlock">
                <div className = "tax">Add Tax Fields</div>
                <div className="taxInfo">You can skip this step and Add Tax Fields, even at the time of generating a Recipt!</div>
            </div>

            <div className="taxFieldsDiv">
            {   (taxHash.length) ?
            
                        taxHash.map((k : number,index : number) =>
                        <div className = "taxFieldDiv" key = {index}> 

                          <Button variant="contained"  className = "taxFieldButton" >
                                   <TextField label = "Tax Field" disabled ={skipStep} id={`standard-basic ${index}`} size = "small" value = {taxFields[k]}  onChange={(e)=>writeFieldValue(e.target.value,index)} className = "taxField" />
                                   <ArrowRightAltTwoToneIcon />
                                   <TextField label = "Tax Value(in %)" disabled = {skipStep} id={`standard-size-small ${index}`} size = "small" value = {taxValues[k]}  onChange={(e)=>writeTaxValue(e.target.value,index)} className = "taxField" />
                                   <span onClick = {
                                     () => removeTaxField(k)
                                                   } ><RemoveCircleTwoToneIcon/></span>
            
                            </Button>
                        </div>
                        )
                        : <div className="taxInfo">Add Tax Fields</div>
            
            }

            
        <div className="addTaxField"><span onClick = {
            () => addTaxField()
        } ><AddBoxTwoToneIcon /></span></div>

            </div>
            
        <div className="skipStep"><Button variant="contained" onClick = {() => handleSkip()}>{ (skipStep) ? 'Undo Skip' : 'Skip Step'}</Button></div>
        <div className="confirmSubmission"><Submit displayString = "Confirm Submission" validate = {()=> printSubmission() } /></div>
       
        </div>
    )
}

export default TaxFieldsPage;