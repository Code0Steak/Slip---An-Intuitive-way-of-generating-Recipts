import React from 'react'
import './DataFieldsPage.css'

interface Props{
    displayDataFields : Array<string>;
    removeDataField : (dataField : string) => any;
}

const DataFieldsPage : React.FC<Props> = ({displayDataFields,removeDataField}) => {

    return(
    <div>
        Data Fields Page

        {
            displayDataFields.map(dataField => <div>{dataField}<span onClick = {
                () => removeDataField(dataField)
            }>-</span></div>)
        }

    </div>)
}

export default DataFieldsPage;
