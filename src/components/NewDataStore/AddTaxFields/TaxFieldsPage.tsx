import React from 'react'
import './TaxFieldsPage.css'
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';
import RemoveCircleTwoToneIcon from '@material-ui/icons/RemoveCircleTwoTone';
import AddBoxTwoToneIcon from '@material-ui/icons/AddBoxTwoTone';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
interface Props {
    displayTaxFields : Array<string>;
    removeTaxField : (index : number) => any;
    addTaxField : () => any;
    writeValue : (value : string, index : number) => any;
    nextPage : () => any;
    backPage: () => any;
}

const TaxFieldsPage : React.FC<Props> = ({displayTaxFields,removeTaxField,addTaxField,writeValue,nextPage,backPage}) => {
    return (
        <div className = "taxFieldsPageMain">
            
            <div className="taxSideBlock">
                <div className = "tax">Add Tax Fields</div>
                <div className="taxInfo">You can skip this step and Add Tax Fields, even at the time of generating a Recipt!</div>
            </div>

            <div className="taxFieldsDiv">
            {   (displayTaxFields.length) ?
                    displayTaxFields.map( (taxField,index) => {

                    return (<div className = "taxFieldDiv" key = {index}> 

                <Button variant="contained"  className = "taxFieldButton" >
                        <TextField id={`standard-basic ${index}`} size = "small" value = {taxField}  onChange={(e)=>writeValue(e.target.value,index)} className = "taxField" />
                        <span onClick = {
                () => removeTaxField(index)
            } ><RemoveCircleTwoToneIcon/></span>

                </Button>
                </div>)

                        }) : <div className="taxInfo">Add Tax Fields</div>
            
            }

            
        <div className="addTaxField"><span onClick = {
            () => addTaxField()
        } ><AddBoxTwoToneIcon /></span></div>

            </div>
            


        <div onClick = {()=> nextPage()} className="taxNextPageButton"><ArrowForwardIcon style ={{fontSize: 30}} /></div>
        <div onClick = {()=> backPage()} className="taxBackPageButton"><ArrowBackIcon style = {{fontSize: 30}}  /></div>

        </div>
    )
}

export default TaxFieldsPage;