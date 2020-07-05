import React from 'react'
import './TaxFieldsPage.css'

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
        <div>
            Tax Fields Page

            {   
            displayTaxFields.map( (taxField,index) => {

            return (<div key = {index}> <input type="text" value = {taxField} onChange = {(e)=>writeValue(e.target.value,index)}  /> <span onClick = {
                () => removeTaxField(index)
            }>{index}-</span>
        </div>)

                })
            
        }

        <div className="addDataField"><span onClick = {
            () => addTaxField()
        } >+</span></div>

        <div onClick = {()=> nextPage()}>Next</div>
        <div onClick = {()=> backPage()}>Back</div>

        </div>
    )
}

export default TaxFieldsPage;