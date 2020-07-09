import React from 'react'
import './FeedDataPage.css'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import FeedDataTable from '../../TabularDataComponents/FeedDataTable/FeedDataTable';
interface Props {
    tableCell : Array<string>;
    tableRow : Array<any>;
    nextPage : () => any;
    backPage : () => any;
    createRow: () => any;
}

const FeedDataPage : React.FC<Props> = ({tableCell,tableRow,nextPage,backPage,createRow}) => {
    return (
        <div className = "feedDataMain">
            Feed Data
        <div className="tableDiv">
            <FeedDataTable cells = {tableCell} rows = {tableRow} createRow = {createRow} />
        </div>
        

        <div onClick = {()=> nextPage()} className="taxNextPageButton"><ArrowForwardIcon style ={{fontSize: 30}} /></div>
        <div onClick = {()=> backPage()} className="taxBackPageButton"><ArrowBackIcon style = {{fontSize: 30}}  /></div>


        </div>
    )
}

export default FeedDataPage;