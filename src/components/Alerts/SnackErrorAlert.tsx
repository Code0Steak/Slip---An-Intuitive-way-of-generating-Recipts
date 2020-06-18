import React from 'react'

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { makeStyles, Theme } from '@material-ui/core/styles';


interface Props {
    open : boolean;
    handleClose : () => any;
    displayMessage: string;
    errorType: any;
}

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const SnackErrorAlert : React.FC<Props> = ({open,handleClose,displayMessage,errorType}) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={errorType}>
                    {displayMessage}
                </Alert>
            </Snackbar>
        </div>
    )
}

export default SnackErrorAlert;