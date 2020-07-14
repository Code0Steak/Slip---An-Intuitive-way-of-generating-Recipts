import React from 'react'
import './DataFieldsPage.css'
import TextField from '@material-ui/core/TextField';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import RemoveCircleTwoToneIcon from '@material-ui/icons/RemoveCircleTwoTone';
import AddBoxTwoToneIcon from '@material-ui/icons/AddBoxTwoTone';
import Button from '@material-ui/core/Button';
import ItemsDataTable from '../../TabularDataComponents/ForNewData/ForDataFieldsPage/ItemsDataTable';

interface Props{
    displayDataFields : Array<string>;
    items : Array<any>;
    shopName: string;
    removeDataField : (index : number) => any;
    addDataField : () => any;
    writeValue : (value : string, index : number) => any;
    writeItem : (value : string, index : number,key : string ) => any;
    writeShopValue : (value: string) => any;
    nextPage : () => any;
}

const DataFieldsPage : React.FC<Props> = ({displayDataFields,items,shopName,removeDataField,addDataField,writeValue,writeItem,writeShopValue,nextPage}) => {

    return(
    <div className = "dataFieldsPageMain">
        <div className="sideBlock">
             <div className="shopName"><TextField id="standard-basic" size = "small" label = "Shop Name" value = {shopName} onChange = {(e)=>writeShopValue(e.target.value)} className = "shopNameField"  /></div>   
            <div className = "pageName">Add Data Fields</div>
            <div className="pageDescription">Add the Data Fields, they will act as columns in your data table!</div>
            
        </div>
        <div className = "dataFieldsDiv">
       
        {
        
        displayDataFields.map( (dataField,index) => {

            return (<div className = "dataFieldDiv" key = {index}> <Button variant="contained"  className = "dataFieldButton" >

       { (dataField === 'Price') ? 
       
         <>

            <TextField disabled id={`standard-basic ${index}`} size = "small"  value = {dataField} className = "dataField" key = {index}  />

         </>
       
       : <>
       <TextField id={`standard-basic ${index}`} size = "small"  value = {dataField} onChange = {(e)=>writeValue(e.target.value,index)} className = "dataField" key = {index}  />
            <span onClick = {
                () => removeDataField(index)
            } ><RemoveCircleTwoToneIcon/></span>
            </> 
            
        }

            </Button> </div>    
        )

                }) 
            
        
        }
        
        <div className="addDataField"><span onClick = {
                    () => addDataField()
                } ><AddBoxTwoToneIcon /></span></div>

        </div>

        <div className="tableDiv">
            {
                ((displayDataFields.length > 1) && (
                    (displayDataFields.length - displayDataFields.filter(item => item === '').length) >= 2
                ) ) ? <ItemsDataTable cells = {displayDataFields} rows = {items} writeItem = {writeItem} /> : ''
            }
        </div>

        <div onClick = {()=> nextPage()} className="nextPageButton"><ArrowForwardIcon style ={{fontSize: 30}} /></div>

    </div>)
}

export default DataFieldsPage;
