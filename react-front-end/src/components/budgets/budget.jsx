import  React,{useEffect, useState } from "react";
import {  TextField, Button, Dialog, DialogActions, DialogContent, DialogContentText,DialogTitle,IconButton } from "@material-ui/core";
// import DatePicker from '@material-ui/lab/DatePicker';
// import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';
export default function Dashboard(){

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    
  };

  const [value, setValue] = useState(new Date());

  return(
    <>
    <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open form dialog
    </Button>
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
    <DialogTitle id="form-dialog-title">New Budget</DialogTitle>
    <DialogContent>
      <DialogContentText>
      Step One: Set up income budget
      </DialogContentText>
      <TextField
        autoFocus
        margin="dense"
        id="name"
        label="income budget name"    
      />
      <br/>
      <TextField        
        margin="dense"
        id="amount"
        label="amount"    
      />
      <br/>
      {/* <DatePicker
          views={['month']}
          label="Year only"
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(params) => <TextField {...params} helperText={null} />}
        /> */}
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose} color="primary">
        Cancel
      </Button>
      <Button onClick={handleSubmit} color="primary">
        Next
      </Button>
    </DialogActions>
  </Dialog>
  </>
  )
}