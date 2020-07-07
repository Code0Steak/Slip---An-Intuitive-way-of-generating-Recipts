import React,{ useState } from 'react'
import './CreateDataStore.css'
import { useHistory } from 'react-router-dom';
import DataFieldsPage from './AddDataFields/DataFieldsPage';
import TaxFieldsPage from './AddTaxFields/TaxFieldsPage';
import FeedDataPage from './FeedData/FeedDataPage';
import FeedTaxDataPage from './FeedTaxData/FeedTaxDataPage';
import SnackErrorAlert from '../Alerts/SnackErrorAlert';
import CancelTwoToneIcon from '@material-ui/icons/CancelTwoTone';
import useStickyState from '../../custom-hooks/persistState/useStickyState';
import CreateDataStoreDialogue from '../Dialogues/CreateDataStoreDialogues/CreateDataStoreDialogues';

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
    const [displayOrder,setDisplayOrder] = useStickyState([],"dataFieldsOrder");
    //Tax Fields Page
    const [taxFields,setTaxFields] = useStickyState(['CGST','SGST'],"taxFields");
    //Feed Data Page
    const [items,setItems] = useStickyState([],"items");

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
    // Tracks if the User has made progress with the form   
    const [progress,setProgress] = useState(false);

    //Function for change in state
    const renderComponent = (step : number) => {
        switch(step){
            case 0 : console.log('step 1');
                     const removeDataField = (index : number) => {
                        let newArr = dataFields.map((dataField : string,i : number) => {
                            if(i !== index)
                                return dataField
                            else return ''
                            
                        })
                        newArr = newArr.filter((el: string) => el !== '')
                        
                        setDataFields([...newArr])

                    }
                     const addDataField = () => {
                         const [p = 'price',...others] = dataFields;
                         setDataFields([...others,'',p]);
                         console.log('added');
                     }
                     const writeValue = (value : string,index : number) => {
                         const newArr = dataFields.map((dataField: string,i: number) => {
                             if(i === index)
                                 return value
                             else return dataField
                         })

                         setDataFields([...newArr]);

                     }

                     const writeShopValue = (value: string) => setShopName(value);

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
                      return <DataFieldsPage displayDataFields = {dataFields} shopName = {shopName} removeDataField = {removeDataField} addDataField = {addDataField} writeShopValue = {writeShopValue} writeValue = {writeValue} nextPage = {nextPage} />;
                      
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
                     
            case 2 : console.log('step 3')

            const nextFeedPage = () => {
                setSelectStep(3);
            }
            const backFeedPage = () => {
                setSelectStep(1);
            }
            return <FeedDataPage tableCell = {dataFields} nextPage = {nextFeedPage} backPage = {backFeedPage} />;
            
            case 3: console.log('step 4')
            return <FeedTaxDataPage />;
            
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
            <CreateDataStoreDialogue open = {openDialogue} handleCloseCancel = {handleCloseCancel} handleCloseExit = {handleCloseExit}  />
        </div>
    )
}

export default CreateDataStore;