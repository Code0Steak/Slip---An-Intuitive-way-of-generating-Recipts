import React from 'react'
import { withStyles, Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import DeleteForeverTwoToneIcon from '@material-ui/icons/DeleteForeverTwoTone';
import MenuItem from '@material-ui/core/MenuItem';
import InputAdornment from '@material-ui/core/InputAdornment';


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  input: {
    color: '#C4C4C4',
  }
});

interface Props {
    cells : Array<string>;
    rows : Array<any>;
    writeItem : (value : string, index : number,key : string ) => any;
    currencies: Array<any>;
    currency: string;
    handleCurrencyChange : (selectedCurrency : string) => any;
    handleCheckChange : (e : boolean, index : number ) => any;
    chkCount : number;
    deleteSelectedRows : () => any;
    toDeleteIndexes : Array<number>
}

const ItemsDataTable : React.FC<Props> = ({cells,rows,writeItem,currencies,currency,handleCurrencyChange,handleCheckChange,chkCount,deleteSelectedRows,toDeleteIndexes}) => {

    const classes = useStyles();
    
    return (
        <div>
            <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                 <div className="tableHead">
                   
                 <div>Data Table</div>  {chkCount} 
                 
                 <div className = "deleteButton">{(chkCount ) ? <DeleteForeverTwoToneIcon onClick = {() => deleteSelectedRows()} /> : '' }</div>
                 
                 
                 </div> 
                 
                  <TableRow>
                  <TableCell></TableCell>
                    {
                        cells.filter((cell : string) => cell != '').map((cell : string,index : number) =><TableCell key = {index}>{(cell === "Price(/item)") ? 
                        
                        <TextField
                            id="standard-select-currency"
                            select
                            label= {`${cell} in`}
                            value={currency}
                            onChange={(e) => handleCurrencyChange(e.target.value)}
                            helperText="Please select your currency"
                            className={classes.input}
                          >
                            {currencies.map((option : any) => (
                              <MenuItem key={option.value} value={option.value}>
                                {option.label}  
                              </MenuItem>
                            ))}
                      </TextField>
                        
                        
                        : cell}</TableCell> )
                    }
                </TableRow>
                </TableHead>
                <TableBody>
                {rows.map((row : any,index : number) => (
                    <TableRow key={index}>
                     <TableCell > {(Object.values(row).some(val => val !== '')) ?  <Checkbox
                          checked = {toDeleteIndexes.includes(index)}
                        onChange = {(e) => handleCheckChange(e.target.checked,index)}
                        color="default"
                        inputProps={{ 'aria-label': 'checkbox with default color' }}
                      /> : ''}</TableCell>
                    {
                      Object.keys(row).filter((key: string) => cells[parseInt(key)] !== '' ).map((key: string,i : number) => 
                      
                      (cells[parseInt(key)] === "Price(/item)") ?
                        
                        <TableCell align="right" key = {key}>
                          
                          <TextField className={classes.input} id={`standard-basic ${row[key]} ${key}`} label={`Item ${index + 1} - ${cells[parseInt(key)]}`} value = {row[key]} autoComplete = "none" key={`standard-basic ${i}`}
                          
                            onChange = {(e) => writeItem(e.target.value,index,key)}
                            InputProps={{
                            startAdornment: <InputAdornment position="start">{currency}</InputAdornment>,
                            }}
                          />
      
                          </TableCell> :

                              <TableCell align="right" key = {key}>
                                                        
                              <TextField className={classes.input} id={`standard-basic ${row[key]} ${key}`} label={`Item ${index + 1} - ${cells[parseInt(key)]}`} value = {row[key]} autoComplete = "none" key={`standard-basic ${i}`}

                                onChange = {(e) => writeItem(e.target.value,index,key)}

                              />

                              </TableCell>

                          
                        )
                    }
                  </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer> 
        </div>
    )
}

export default ItemsDataTable;