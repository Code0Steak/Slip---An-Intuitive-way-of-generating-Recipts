import React,{ useState } from 'react'
import './CreateDataStore.css'
import { useHistory } from 'react-router-dom';
import DataFieldsPage from './AddDataFields/DataFieldsPage';
import TaxFieldsPage from './AddTaxFields/TaxFieldsPage';
import SnackErrorAlert from '../Alerts/SnackErrorAlert';
import CancelTwoToneIcon from '@material-ui/icons/CancelTwoTone';
import useStickyState from '../../custom-hooks/persistState/useStickyState';
import CreateDataStoreDialogue from '../Dialogues/CreateDataStoreDialogues/CreateDataStoreDialogues';
import Pagination from '@material-ui/lab/Pagination';
import DbSubmissionDialogue from '../Dialogues/DbSubmissionDialogues/DbSubmissionDialogue';
import DbSubmissionDialogueContent from './DbSubmissionDialogueContent';

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
    //Currencies
    const currencies = [
        {
            value: 'INR',
            label: '₹',
        },
        {
          value: 'USD',
          label: '$',
        },
        {
          value: 'EUR',
          label: '€',
        },
        {
          value: 'BTC',
          label: '฿',
        },
        {
          value: 'JPY',
          label: '¥',
        },
      ];
      const [currency,setCurrency] = useStickyState('INR',"currency");

      const handleCurrencyChange = (selectedCurrency : string) => {
          setCurrency(selectedCurrency);
      }

    //Data Fields Page
    const [dataFields,setDataFields] = useStickyState(['ID','Item Name','Price(/item)'],"dataFields");
    const [shopName,setShopName] = useStickyState('',"shopName");
    const [items,setItems] = useStickyState([{'0' : '','1' : '', '2' : ''}],"items");   
    const [hash,setHash] = useStickyState([0,1,2],"hashArray");
    const [createRow,setCreateRow] = useStickyState(1,"createRow");

    const [checkedCount,setCheckedCount] = useStickyState(0,"checkedCount"); 
    const [toDeleteIndexes,setToDeleteIndexes] = useStickyState([],"toGroupIndexes");
    //Order: const [displayOrder,setDisplayOrder] = useStickyState([],"dataFieldsOrder");
    //Tax Fields Page
    const [taxFields,setTaxFields] = useStickyState(['CGST','SGST'],"taxFields");
    const [taxHash,setTaxHash] = useStickyState([0,1],"taxHash");
    const [taxValues,setTaxValues] = useStickyState(['5','5'],"setTaxValue");
    const [skip,setSkip] = useStickyState(false,"skipTaxStep");
    
    //reset
    const reset = () => {
        console.log('erazed')
        localStorage.clear();
        setSelectStep(0);
        setDataFields(['ID','Item Name','Price(/item)']);
        setShopName('');
        setTaxFields(['CGST','SGST']);
        setItems([]);
    }

    //Navigation
    const nextPage = () => {
        if(items.length < 3){
            setOpenAlert(true);
            setDisplayMessage("Please add at least 3 rows in your Data Table to continue to the next Step");
            setErrorType("error");
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

    const prevPage = () => {
        setSelectStep(0);
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

                        newArr = newArr.filter((dataField: string) => dataField !== '');
                        setDataFields(newArr);

                        let removeHash = hash.filter((i : number) => (i !== index) )   
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
                        //Price value regex
                        if( (parseInt(key) === dataFields.indexOf('Price(/item)')) && (!/^\d+$/.test(value)) ){
                            setOpenAlert(true);
                            setDisplayMessage("The Price field should contain values of the type 'number'. Note : If the Price field is left blank, it's value will be considered as 0");
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

                      return <DataFieldsPage displayDataFields = {dataFields} items = {items} shopName = {shopName} removeDataField = {removeDataField} addDataField = {addDataField} writeShopValue = {writeShopValue} writeValue = {writeValue} writeItem = {writeItem}  
                      
                     currencies = {currencies} currency = {currency} handleCurrencyChange = {handleCurrencyChange}

                      handleCheckChange = {handleCheckChange} chkCount = {checkedCount} deleteSelectedRows = {deleteSelectedRows}
                      
                      toDeleteIndexes = {toDeleteIndexes}

                      />;
                      
            case 1 : console.log('step2')

                  //Remove Tax Field
                    const removeTaxField = (index : number) => {
                        
                        let newTaxField = taxFields;
                        newTaxField = newTaxField.filter((_ : string,i : number ) => i !== index);

                        let newTaxValue = taxValues;
                        newTaxValue = newTaxValue.filter((_ : string,i : number ) => i !== index);

                        let newHash = newTaxValue.map((_ : string,i : number) => i);

                        setTaxFields(newTaxField);
                        setTaxValues(newTaxValue);
                        setTaxHash(newHash);
                        console.log(taxFields,taxValues,taxHash)

                    }

                    //Add Tax Field
                    const addTaxField = () => {
                        setTaxFields([...taxFields,'']);
                        setTaxHash([...taxHash,taxHash.slice(-1)[0] + 1]);
                        setTaxValues([...taxValues,'']);
                        console.log('added');
                    }

                    const writeFieldValue = (value : string,index : number) => {
                        let newField = taxFields;
                        newField = newField.map((val : string,i: number) => {
                            if(i === index) return value 
                            else return val
                        })
                        setTaxFields(newField);
                        console.log(taxFields);
                    }

                    const writeTaxValue = (value : string,index : number) => {
                        
                        //Validation for the tax value
                        if(!/^\d+$/.test(value)){
                            setOpenAlert(true);
                            setDisplayMessage("The Tax value should be of the type 'number'");
                            setErrorType("error");
                            value = ''
                        }
                        else if(parseInt(value) > 100){
                            setOpenAlert(true);
                            setDisplayMessage("Please add in the percentage amount");
                            setErrorType("error");
                            value = '';
                        }

                        if(openAlert){
                            setOpenAlert(false);
                            setDisplayMessage("");
                            setErrorType("");
                        }

                        let newTaxValue = taxValues;
                        newTaxValue = newTaxValue.map((val : string,i: number) => {
                            if(i === index) return value 
                            else return val
                        })
                        setTaxValues(newTaxValue);
                        console.log(taxValues);
                        

                    }

                    //Skip tax page
                    const handleSkip = () => setSkip(!skip);
            
                    const printSubmission = () => {

                        
                        if((taxFields.includes('') || taxValues.includes('')) && (!skip) ){
                            setOpenAlert(true);
                            setDisplayMessage("Please don't leave the Tax fields incomplete during submission. If you want to skip this step of adding Tax fields, click on Skip Step");
                            setErrorType("error");
                        }
                        else{

                            console.log('items',items);
                            
                            console.log('tax',taxFields,taxValues);
                            setOpenDbDialogue(true);
                        }
                    }


                     return <TaxFieldsPage taxFields = {taxFields} taxHash = {taxHash} taxValues = {taxValues} removeTaxField = {removeTaxField} addTaxField = {addTaxField} writeFieldValue = {writeFieldValue} writeTaxValue = {writeTaxValue}
                       
                      skipStep = {skip} handleSkip = {handleSkip} printSubmission = {printSubmission}
                      />;
                     
            
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

  //Confirm Submission Dialogue
  const [openDbDialogue,setOpenDbDialogue] = useStickyState(false,"openDbDialogue");

  const handleClickClose = () => {
    setOpenDbDialogue(false);
  }

  const handleClickSubmit = () => {
    setOpenDbDialogue(false);

    let newItems = items;
    newItems = newItems.map((item : {[x : string] : string}) => {
        if(Object.values(item).some((i : string) => i !== '')) return item
    })

    newItems = newItems.filter((item : {[x : string] : string}) => item);

    if(!skip){
        let newTaxFields = taxFields;
        let newHash = taxHash;
        let newTaxValues = taxValues;
        let taxObject = {};
        newHash.forEach((i : number) => taxObject = {...taxObject,[newTaxFields[i]] : newTaxValues[i]} );
        console.log('noGroupItems',taxObject);
    }

    console.log('taxFields',newItems);

  }

    return (
        <div className = "mainOne">
            <div className = "titleText">
                <h2><span onClick = {()=>setOpenDialogue(true)}>Slip</span> - New Data Store </h2>
            </div>  
            {
                renderComponent(selectStep)
            }
            
            <div className = "cancel" onClick = {()=>setOpenDialogue(true)}  ><CancelTwoToneIcon style={{fontSize: 40}} /></div>
            <Pagination count={2} page={selectStep + 1} onClick = {
                () => {
                    if(selectStep === 0){
                        nextPage();
                    }
                    else{
                        prevPage();
                    }
                }
            }  />
            <SnackErrorAlert open = {openAlert} handleClose = {handleCloseAlert} displayMessage = {displayMessage} errorType = {errorType} />
            <CreateDataStoreDialogue open = {openDialogue} handleCloseCancel = {handleCloseCancel} handleCloseExit = {handleCloseExit} title = {'Warning!'} content = {'Going back to Home will erase all the progress you made so far in Creating a New DataStore. Are you sure you want to Exit?'} buttonContent = {'Exit'}  />
            <DbSubmissionDialogue open = {openDbDialogue} title = "Confirm Submission" content = {<DbSubmissionDialogueContent shopName = {shopName} />} toMatch = {`Create ${shopName} Data Store`} handleClickClose = {handleClickClose} handleClickSubmit = {handleClickSubmit} />
        </div>
    )
}

export default CreateDataStore;