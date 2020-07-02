import React, { useState } from 'react'
import './CreateDataStore.css'
import { useHistory } from 'react-router-dom';
import DataFieldsPage from './AddDataFields/DataFieldsPage';

interface Props {
    
}

const CreateDataStore : React.FC<Props> = () => {
    
    //Routing
    const history = useHistory();

    //Render Content based on Step
    const [selectStep,setSelectStep] = useState(1);

    const renderContent = (selectStep : number) => {
        switch(selectStep){
            case 1: history.push(`#${selectStep}`);
                    return <DataFieldsPage />;
            default: history.push('where?');
                    return <div>Error 403</div>

        }
    }

    return (
        <div>
           {
              
           }
        </div>
    )
}

export default CreateDataStore;