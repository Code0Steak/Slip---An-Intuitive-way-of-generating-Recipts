import React from 'react';
import { withStyles, Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

//Cell Styling
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

//Row Styling
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

interface Props{
    cells: Array<string>;
    rows: Array<any>
}

const FeedDataTable: React.FC<Props> = ({cells,rows}) => {
    const classes = useStyles();
  
    return (
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              {
                  cells.map(cell => <StyledTableCell>{cell}</StyledTableCell> )
              }
            </TableRow>
          </TableHead>
          <TableBody>
            {cells.map((row) => (
              <StyledTableRow key={row}>
                <StyledTableCell component="th" scope="row">
                  {row}
                </StyledTableCell>
                <StyledTableCell align="right">{row}</StyledTableCell>
                <StyledTableCell align="right">{row}</StyledTableCell>
                <StyledTableCell align="right">{row}</StyledTableCell>
                <StyledTableCell align="right">{row}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

export default FeedDataTable; 