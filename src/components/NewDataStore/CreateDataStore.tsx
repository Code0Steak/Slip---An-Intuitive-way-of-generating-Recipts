import React,{ useState } from 'react'
import './CreateDataStore.css'
import { useHistory } from 'react-router-dom';
import DataFieldsPage from './AddDataFields/DataFieldsPage';
import TaxFieldsPage from './AddTaxFields/TaxFieldsPage';
import FeedDataPage from './FeedData/FeedDataPage';
import FeedTaxDataPage from './FeedTaxData/FeedTaxDataPage';
import { Link } from 'react-router-dom'
interface Props {
    
}

const CreateDataStore : React.FC<Props> = () => {
    
    /* Routing */
    const history = useHistory();

    /* Component Logic */
    const [selectStep,setSelectStep] = useState(0);
    
    //Data Fields Page
    const [dataFields,setDataFields] = useState(['ID','Item Name','Price']);

    // Tracks if the User has made progress with the form   
    const [progress,setProgress] = useState(false);

    //Function for change in state
    const renderComponent = (step : number) => {
        switch(step){
            case 0 : console.log('step 1');
                     const removeDataField = (dataField : string) => {
                         
                        const [remove = dataField,...others] = dataFields;
                        setDataFields(others);
                     }
                      return <DataFieldsPage displayDataFields = {dataFields} removeDataField = {removeDataField} />;
                      
            case 1 : console.log('step2')
                     return <TaxFieldsPage />;
                     
            case 2 : console.log('step 3')
            return <FeedDataPage />;
            
            case 3: console.log('step 4')
            return <FeedTaxDataPage />;
            
            default: console.log('No Page Match')
            return '403 error';
          

        }
    }
    return (
        <div>
            <div>
                <h2><Link to = "/home">Slip</Link> - New Data Store </h2>
            </div>  
            {
                renderComponent(selectStep)
            }
            <div>Close</div>
            <div className="stepNumber"><span>1</span> <span>2</span> <span>3</span> <span>4</span></div>
        </div>
    )
}

export default CreateDataStore;