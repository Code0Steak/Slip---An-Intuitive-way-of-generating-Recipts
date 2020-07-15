import React,{ useState } from 'react'
import './CreateDataStore.css'
import { useHistory } from 'react-router-dom';
import DataFieldsPage from './AddDataFields/DataFieldsPage';
import TaxFieldsPage from './AddTaxFields/TaxFieldsPage';
import SnackErrorAlert from '../Alerts/SnackErrorAlert';
import CancelTwoToneIcon from '@material-ui/icons/CancelTwoTone';
import useStickyState from '../../custom-hooks/persistState/useStickyState';
import CreateDataStoreDialogue from '../Dialogues/CreateDataStoreDialogues/CreateDataStoreDialogues';
import { has } from 'lodash-es';

interface Props {
    
}

const CreateDataStore : React.FC<Props> = () => {
    
    /* Routing */
    const history = useHistory();

    /* Handle Close */
    const [openDialogue, setOpenDialogue] = React.useState(false);

    const handleCloseCancel = () => {
        setOpenDialogue(false);
    };

    const handleCloseExit = () => {
        reset();
        setOpenDialogue(false);
        history.push('/home');
    };


    /* Component Logic and Variables*/
    const [selectStep,setSelectStep] = useStickyState(0,"step");
    
    //Data Fields Page
    const [dataFields,setDataFields] = useStickyState(['ID','Item Name','Price'],"dataFields");
    const [shopName,setShopName] = useStickyState('',"shopName");
    const [items,setItems] = useStickyState([{'0' : '','1' : '', '2' : ''}],"items");   
    const [hash,setHash] = useStickyState([0,1,2],"hashArray");
    const [createRow,setCreateRow] = useStickyState(1,"createRow");

    const [checkedCount,setCheckedCount] = useStickyState(0,"checkedCount"); 
    const [toDeleteIndexes,setToDeleteIndexes] = useStickyState([],"toGroupIndexes");
    //Order: const [displayOrder,setDisplayOrder] = useStickyState([],"dataFieldsOrder");
    //Tax Fields Page
    const [taxFields,setTaxFields] = useStickyState(['CGST','SGST'],"taxFields");
    
    //reset
    const reset = () => {
        console.log('erazed')
        localStorage.clear();
        setSelectStep(0);
        setDataFields(['ID','Item Name','Price']);
        setShopName('');
        setTaxFields(['CGST','SGST']);
        setItems([]);
    }

    //Function for change in state
    const renderComponent = (step : number) => {
        switch(step){
            case 0 : console.log('step 1');
                     //Remove a dataField from a dataFields array
                     const removeDataField = (index : number) => {
                        let newArr = dataFields.map((dataField : string,i : number) => {
                            if(i !== index)
                                return dataField
                            else return ''
                            
                        })

                        newArr = newArr.filter((dataField: string) => dataField != '');
                        setDataFields(newArr);

                        let removeHash = hash.filter((i : number) => (i != index) )   
                        setHash(removeHash);

                        let newItems = items;
                        newItems.forEach((item : {[key : string] : string}) => delete item[`${index}`]);
                        setItems(newItems);
                        console.log(dataFields,hash,items);
                    }

                    //Add a dataField to the dataFields array
                     const addDataField = () => {

                        if(dataFields.includes('')){
                            setOpenAlert(true);
                            setDisplayMessage("Please fill in the blank field and then add a new Data Field");
                            setErrorType("error");
                        }
                        else{
                         setDataFields([...dataFields,'']);

                         let newIndex = hash.slice(-1)[0] + 1;
                         setHash([...hash, newIndex ])
                         

                         let newItems = items;
                        //  newItems.forEach((item : {[key : string]:string}) => item[`${newIndex}`] = '' );
                        newItems = newItems.map((item : {[key : string]:string}) => {
                            item = {...item,[`${newIndex}`] : '' };
                            return item;
                        } )
                         setItems(newItems);
                         
                         console.log(dataFields,hash,items);
                        }
                    }

                     //Write a value in the dataFields array
                     const writeValue = (value : string,index : number) => {
                        let changeValue = value;
                         const newArr = dataFields.map((dataField: string,i: number) => {
                             if(i === index)
                                 return changeValue;
                             else{ 
                                 //If 2 dataFields have the same value
                                if(dataField === changeValue){
                                    setOpenAlert(true);
                                    setDisplayMessage("The name of two data fields matched");
                                    setErrorType("error");
                                    changeValue = '';
                                    return dataField;
                                }
                                else
                                
                                return dataField}
                         })

                         setDataFields([...newArr]);
                         console.log(dataFields,hash,items)
                    }

                    const writeItem = (value: string,index: number,key : string) => {

                        if( (parseInt(key) === dataFields.indexOf('Price')) && (!parseInt(value)) ){
                            setOpenAlert(true);
                            setDisplayMessage("The Price field should contain values of the number type");
                            setErrorType("error");
                            value = '';
                        }
                        else{
                            if(openAlert){
                            setOpenAlert(false);
                            setDisplayMessage("");
                            setErrorType("");
                            }
                        }
                        
                        const old = items[index];
                        const updated = { ...old, [key]: value }
                        let clone = [...items];
                        clone[index] = updated;
                        
                        //Add a new row if change is for the first time
                        if(index === createRow - 1 ){
                            
                            let _clone : any = {};
                            Object.keys(old).forEach((key : string) => _clone = {..._clone,[key] : ''}  );
                            clone = [...clone, _clone ];
                            
                            setCreateRow(createRow + 1);
                            console.log(items,createRow);
                        }
                        console.log(items,createRow);
                        setItems(clone);
                    }

                    //Set Shop Name
                     const writeShopValue = (value: string) => setShopName(value);

                     //Go to Next Page
                     const nextPage = () => {
                         if(dataFields.length === 0){
                            setOpenAlert(true);
                            setDisplayMessage("Please add Data Fields to continue!");
                            setErrorType("error");
                             console.log(dataFields)
                         }
                         else if(!shopName){
                            setOpenAlert(true);
                            setDisplayMessage("Please enter your Shop Name!");
                            setErrorType("error");
                             console.log(shopName)
                         }
                         else{
                            console.log(dataFields)
                             setSelectStep(1)
                         }

                     }


                     //Groups
                     const handleCheckChange = (e : boolean,index : number) => {

                        if(e){ 
                            setCheckedCount(checkedCount + 1);
                            setToDeleteIndexes([...toDeleteIndexes,index]);
                        }
                        else {
                            setCheckedCount(checkedCount - 1);
                            let updated = toDeleteIndexes.filter((i : number) => i !== index);
                            setToDeleteIndexes(updated);
                        }

                        console.log(toDeleteIndexes,checkedCount);
                     }

                     const deleteSelectedRows = () => {
                        //  let newItems = items.filter((_ : {[x : string] : string},index : number) =>   )
                        let newItems = items;
                        newItems = newItems.filter((_ : {[x : string] : string},index : number) =>!toDeleteIndexes.includes(index));

                        //reset some fields
                        setCheckedCount(checkedCount - toDeleteIndexes.length);
                        setToDeleteIndexes([]);
                        setItems(newItems);
                        setCreateRow(1);
                        console.log('del',items,toDeleteIndexes);
                     }

                      return <DataFieldsPage displayDataFields = {dataFields} items = {items} shopName = {shopName} removeDataField = {removeDataField} addDataField = {addDataField} writeShopValue = {writeShopValue} writeValue = {writeValue} writeItem = {writeItem} nextPage = {nextPage} 
                      
                      handleCheckChange = {handleCheckChange} chkCount = {checkedCount} deleteSelectedRows = {deleteSelectedRows}
                      
                      toDeleteIndexes = {toDeleteIndexes}

                      />;
                      
            case 1 : console.log('step2')
                    const removeTaxField = (index : number) => {
                        let newArr = taxFields.map((taxField : string,i : number) => {
                            if(i !== index)
                                return taxField
                            else return ''
                            
                        })
                        newArr = newArr.filter((el: string) => el !== '')
                        setTaxFields([...newArr]);

                    }
                    const addTaxField = () => {
                        setDataFields([...dataFields,'']);
                        console.log('added');
                    }
                    const writeTaxValue = (value : string,index : number) => {
                        const newArr = taxFields.map((taxField : string,i : number) => {
                            if(i === index)
                                return value
                            else return taxField
                            
                        })

                        setTaxFields([...newArr]);

                    }
                    const nextTaxPage = () => {
                        if(dataFields){
                            setSelectStep(2)
                        }
                        else{
                            setOpenAlert(true);
                            setDisplayMessage("Are you sure you want to continue without adding Tax Fields!");
                            setErrorType("info");
                        }

                    }

                    const backTaxPage = () => {
                        setSelectStep(0)
                    }

                     return <TaxFieldsPage displayTaxFields = {taxFields} removeTaxField = {removeTaxField} addTaxField = {addTaxField} writeValue = {writeTaxValue} nextPage = {nextTaxPage} backPage = {backTaxPage} />;
                     
            
            default: console.log('No Page Match')
            return '403 error';
          

        }
    }

    //Snackbar declarations
  const [openAlert,setOpenAlert] = useState(false);
  const [displayMessage,setDisplayMessage] = useState('');
  const handleCloseAlert = (event?: React.SyntheticEvent, reason?: string) => {
      if (reason === 'clickaway') {
        return;
      }

      setOpenAlert(false);
      setDisplayMessage('');
      setErrorType('');
      
    };
  const [errorType,setErrorType] = useState('');


    return (
        <div className = "mainOne">
            <div className = "titleText">
                <h2><span onClick = {()=>setOpenDialogue(true)}>Slip</span> - New Data Store </h2>
            </div>  
            {
                renderComponent(selectStep)
            }
            <div className = "cancel" onClick = {()=>setOpenDialogue(true)}  ><CancelTwoToneIcon style={{fontSize: 40}} /></div>
            <div className="stepNumber"><span>1</span> <span>2</span> <span>3</span> <span>4</span></div>
            <SnackErrorAlert open = {openAlert} handleClose = {handleCloseAlert} displayMessage = {displayMessage} errorType = {errorType} />
            <CreateDataStoreDialogue open = {openDialogue} handleCloseCancel = {handleCloseCancel} handleCloseExit = {handleCloseExit} title = {'Warning!'} content = {'Going back to Home will erase all the progress you made so far in Creating a New DataStore. Are you sure you want to Exit?'} buttonContent = {'Exit'}  />
        </div>
    )
}

export default CreateDataStore;