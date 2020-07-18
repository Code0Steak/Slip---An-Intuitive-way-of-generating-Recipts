import React from 'react'
import './DataFieldsPage.css'
import TextField from '@material-ui/core/TextField';
import RemoveCircleTwoToneIcon from '@material-ui/icons/RemoveCircleTwoTone';
import AddBoxTwoToneIcon from '@material-ui/icons/AddBoxTwoTone';
import Button from '@material-ui/core/Button';
import ItemsDataTable from '../../TabularDataComponents/ForNewData/ForDataFieldsPage/ItemsDataTable';
import DraggableListComponent from '../DraggableList/DraggableListComponent';

interface Props{
    displayDataFields : Array<string>;
    items : Array<any>;
    shopName: string;
    removeDataField : (index : number) => any;
    addDataField : () => any;
    writeValue : (value : string, index : number) => any;
    writeItem : (value : string, index : number,key : string ) => any;
    writeShopValue : (value: string) => any;
    reorder : (list : Array<string>, startIndex : number, endIndex : number) => any;
    displayOrder: Array<string>;
    currencies: Array<any>;
    currency: string;
    handleCurrencyChange : (selectedCurrency : string) => any;
    handleCheckChange : (e : boolean,index : number) => any;
    chkCount : number;
    deleteSelectedRows : () => any;
    toDeleteIndexes : Array<number>;
}

const DataFieldsPage : React.FC<Props> = ({displayDataFields,items,shopName,removeDataField,addDataField,writeValue,writeItem,writeShopValue,currencies,currency,handleCurrencyChange , handleCheckChange, chkCount, deleteSelectedRows,toDeleteIndexes,reorder,displayOrder}) => {

    return(
    <div className = "dataFieldsPageMain">
        <div className="navBlock">
            <div className = "pageName">Add Data Fields and Data Tables</div>
            <div className="shopName"><TextField id="standard-basic" size = "small" label = "Shop Name" value = {shopName} onChange = {(e)=>writeShopValue(e.target.value)} className = "shopNameField"  /></div>   

        </div>

        {/* <div className = "dataFieldsDiv">
       
        {
        
        displayDataFields.map( (dataField,index) => {

            return (<div className = "dataFieldDiv" key = {index}> <Button variant="contained"  className = "dataFieldButton" >

       { (dataField === 'Price(/item)') ? 
       
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

        </div> */}
                <div className = "dataFieldsDiv">
                    <DraggableListComponent displayDataFields = {displayDataFields}  reorder = {reorder} removeDataField = {removeDataField} writeValue = {writeValue} displayOrder = {displayOrder} />
                    <div className="addDataField"><span onClick = {
                    () => addDataField()
                } ><AddBoxTwoToneIcon /></span></div>
                </div>
        <div className="tableDiv">
            {
                ((displayDataFields.length > 1) && (
                    (displayDataFields.length - displayDataFields.filter(item => item === '').length) >= 2
                ) ) ? <ItemsDataTable cells = {displayDataFields} rows = {items} writeItem = {writeItem} currencies = {currencies} currency = {currency} handleCurrencyChange = {handleCurrencyChange} handleCheckChange = {handleCheckChange} chkCount = {chkCount} deleteSelectedRows = {deleteSelectedRows}
                
                toDeleteIndexes = {toDeleteIndexes}

                /> : ''
            }
        </div>


    </div>)
}

export default DataFieldsPage;
