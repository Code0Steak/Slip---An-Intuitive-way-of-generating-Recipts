import React from 'react';
import { withStyles, Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }),
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }),
)(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

interface Props {
  cells: Array<string>;
  rows: Array<any>;
  createRow: () => any;
}

const FeedDataTable : React.FC<Props> = ({cells,rows,createRow}) => {

  const classes = useStyles();

  return (
    <div>
        <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              {
                cells.map((cell: string)=><StyledTableCell align="right" key = {cell}>{cell}</StyledTableCell>)
              }
            </TableRow>
          </TableHead>
          <TableBody>
            {(rows.length === 0) ? createRow() : rows.map((row : any,index: number) => (
              <TableRow key={index}>
                {
                  Object.keys(row).map((key: string) => <StyledTableCell align="right" key = {key}>
                    
                    <TextField id={`standard-basic ${key}`} label={`Item ${index + 1} ${key}`} value = {row[key]} autoComplete = "none" />

                    </StyledTableCell>)
                }
              </TableRow>
            ))
         
          
          }
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default FeedDataTable;