import React from 'react';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import WarningTwoToneIcon from '@material-ui/icons/WarningTwoTone';
const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });

export interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme: Theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

interface Props{
    open: boolean;
    handleCloseCancel: () => any;
    handleCloseExit: () => any;
}

const CreateDataStoreDialogues: React.FC<Props> = ({open,handleCloseCancel,handleCloseExit}) => {
  

  return (
    <div>
      
      <Dialog onClose={handleCloseCancel} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleCloseCancel}>
          <WarningTwoToneIcon/>
        </DialogTitle>
        <DialogContent dividers>
          Going back to Home will erase all the progress you made so far in Creating a New DataStore. Are you sure you want to Exit?
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCloseExit} color="primary">
            Exit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CreateDataStoreDialogues;