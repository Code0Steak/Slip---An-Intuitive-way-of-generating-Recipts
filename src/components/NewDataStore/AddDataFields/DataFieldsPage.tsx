import React from 'react'
import './DataFieldsPage.css'
import TextField from '@material-ui/core/TextField';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import RemoveCircleTwoToneIcon from '@material-ui/icons/RemoveCircleTwoTone';
import AddBoxTwoToneIcon from '@material-ui/icons/AddBoxTwoTone';
import Button from '@material-ui/core/Button';

interface Props{
    displayDataFields : Array<string>;
    removeDataField : (index : number) => any;
    addDataField : () => any;
    writeValue : (value : string, index : number) => any;
    nextPage : () => any;
}

const DataFieldsPage : React.FC<Props> = ({displayDataFields,removeDataField,addDataField,writeValue,nextPage}) => {

    return(
    <div className = "dataFieldsPageMain">
        <div className="sideBlock">
                
            <div className = "pageName">Add Data Field</div>
            <div className="pageDescription">Add the Data Fields, they will act as columns in your data table!</div>
            
        </div>
        <div className = "dataFieldsDiv">
        {   
            displayDataFields.map( (dataField,index) => {

            return (<div className = "dataFieldDiv" key = {index}> <Button variant="contained"  key = {index} className = "dataFieldButton" >

<TextField id="standard-basic" size = "small"  value = {dataField} onChange = {(e)=>writeValue(e.target.value,index)} className = "dataField" />
            <span onClick = {
                () => removeDataField(index)
            } key = {index} ><RemoveCircleTwoToneIcon/></span>

            </Button> </div>    
        )

                })
            
        }

        
        <div className="addDataField"><span onClick = {
                    () => addDataField()
                } ><AddBoxTwoToneIcon /></span></div>

        </div>


        <div onClick = {()=> nextPage()} className="nextPageButton"><ArrowForwardIcon /></div>

    </div>)
}

export default DataFieldsPage;
