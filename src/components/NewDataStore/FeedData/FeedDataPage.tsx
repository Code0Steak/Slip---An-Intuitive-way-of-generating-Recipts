import React from 'react'
import './FeedDataPage.css'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import FeedDataTable from '../../TabularDataComponents/FeedDataTable/FeedDataTable';
interface Props {
    tableCell : Array<string>
    nextPage : () => any;
    backPage : () => any;
}

const FeedDataPage : React.FC<Props> = ({tableCell,nextPage,backPage}) => {
    return (
        <div className = "feedDataMain">
            Feed Data
        <div className="tableDiv">
            {   
                tableCell.map(item=>item)
            }
            <FeedDataTable cells = {tableCell} rows = {tableCell} />
        </div>
        

        <div onClick = {()=> nextPage()} className="taxNextPageButton"><ArrowForwardIcon style ={{fontSize: 30}} /></div>
        <div onClick = {()=> backPage()} className="taxBackPageButton"><ArrowBackIcon style = {{fontSize: 30}}  /></div>


        </div>
    )
}

export default FeedDataPage;