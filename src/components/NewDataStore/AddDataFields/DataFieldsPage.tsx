import React,{useRef} from 'react'
import './DataFieldsPage.css'
import {useGesture} from 'react-use-gesture'
import { useSprings, animated, interpolate } from 'react-spring'

interface Props{
    displayDataFields : Array<string>;
    removeDataField : (index : number) => any;
    addDataField : () => any;
    writeValue : (value : string, index : number) => any;
}

const DataFieldsPage : React.FC<Props> = ({displayDataFields,removeDataField,addDataField,writeValue}) => {

    // Lodash Clamp
    const clamp = (num : number,lower : number,upper : number) : number => {

        num = +num
        lower = +lower
        upper = +upper
        lower = lower === lower ? lower : 0
        upper = upper === upper ? upper : 0
        if (num === num) {
            num = num <= upper ? num : upper
            num = num >= lower ? num : lower
        }
        return num

    }

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
                () => removeDataField(index)
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
