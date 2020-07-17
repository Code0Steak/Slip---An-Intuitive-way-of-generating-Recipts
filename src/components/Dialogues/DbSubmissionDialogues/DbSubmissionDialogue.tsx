import React,{useState} from 'react';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import useStickyState from '../../../custom-hooks/persistState/useStickyState';
import LinearProgress from '@material-ui/core/LinearProgress';
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
      <Typography variant="h6">{children}</Typography>
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


interface Props {
    open: boolean;
    title: string;
    content: any;
    feedback: Array<string>;
    toMatch: string;
    finalSubmission: boolean;
    handleClickClose : () => any;
    handleClickSubmit : () => any;
   
}

 const DbSubmissionDialogue : React.FC<Props> = ({open,title,content,feedback,toMatch,finalSubmission,handleClickClose,handleClickSubmit}) => {
    
    const [err,setErr] = useState(true);
    const handleChange = (value : string) => {
        if(value === toMatch)
          setErr(!err);
    }
    return (
        <div>
            
            <Dialog onClose={handleClickClose} aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle id="customized-dialog-title" onClose={handleClickClose}>
                {title}
                </DialogTitle>
                <DialogContent dividers>
                    {
                      (finalSubmission ) ?
                          
                            (<div>

                            <div>{(feedback) ? feedback.map((msg : string) =><div>{msg}</div> ) : ''}</div>
                              <div><LinearProgress  /></div>
                                  </div>
                            )
                            : 
                            (   <>{ content }<TextField error = {err} id="standard-error" label="Enter Text"  onChange = {(e)=> handleChange(e.target.value)} /></>
                            )
                    }
                </DialogContent>
                <DialogActions>
                  {(finalSubmission) ? '' :
                <Button disabled = {err} autoFocus onClick={handleClickSubmit} color="primary"  >
                    Confirm Submission
                </Button>}
                </DialogActions>
            </Dialog>
         </div>
    )
}

export default DbSubmissionDialogue;