import React from 'react'
import './DataFieldsPage.css'

interface Props{
    displayDataFields : Array<string>;
    removeDataField : (dataField : string,index : number) => any;
    addDataField : () => any;
    writeValue : (value : string, index : number) => any;
}

const DataFieldsPage : React.FC<Props> = ({displayDataFields,removeDataField,addDataField,writeValue}) => {

    return(
    <div>
        Data Fields Page

        {   
            displayDataFields.map( (dataField,index) => {

            // if(dataField) 
            
            // return (<div key = {index}>{dataField}<span onClick = {
            //         () => removeDataField(dataField)
            //     }>-</span>
            // </div>)

            // else return 
            return (<div key = {index}> <input type="text" value = {dataField} onChange = {(e)=>writeValue(e.target.value,index)}  /> <span onClick = {
                () => removeDataField(dataField,index)
            }>{index}-</span>
        </div>)

                })
            
        }

        <div className="addDataField"><span onClick = {
            () => addDataField()
        } >+</span></div>

    </div>)
}

export default DataFieldsPage;
