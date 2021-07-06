import  React,{ useState} from "react";
import axios from 'axios';

import {  TextField, Button, Dialog, DialogActions, DialogContent, DialogContentText,DialogTitle} from "@material-ui/core";

export default function budgetForm(){

  const [open, setOpen] = useState(false);
  const [formValue, setFormValue] = useState({  
    month: "",
    amount: "",
    name: ""    
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    formValue.month=formValue.month.slice(-2);

    axios.post('http://localhost:3002/budgets', {data:formValue})
    .then(() => {
      setFormValue({
      month: "",
      amount: "",
      name: ""   
      })    
      handleClose()      
    })
    .catch(err => console.log( err));

  };

  const handleChange = (key,value) => {
    // console.log(key,value);
    
    setFormValue(prev => ({
      ...prev,
      [key]:value  
    }))
  }

  return (
    <>
    <Button variant="outlined" color="primary" style={{height:"50px",margin:"50px"}} onClick={handleClickOpen}>
        Open form dialog
    </Button>
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
    <DialogTitle id="form-dialog-title">Income Budget</DialogTitle>
    <DialogContent>
      <DialogContentText>
      Step One: Set up income budget
      </DialogContentText>
      <TextField
        autoFocus
        margin="dense"
        id="name"
        label="budget title" 
        type="text" 
        onChange={(event)=>handleChange("name",event.target.value)}
        value={formValue.name}  
      />
      <br/>
      <TextField        
        margin="dense"
        id="amount"
        type="number"
        label="amount" 
        onChange={(event)=>handleChange("amount",event.target.value)}
        value={formValue.amount}  
      />
      <br/>
      <TextField
        margin="dense"
        id="depositDate"
        type="month"
        onChange={(event)=>handleChange("month",event.target.value)}
        // value={formValue.month}            
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose} color="primary">
        Cancel
      </Button>
      <Button onClick={handleSubmit} color="primary">
        Submit
      </Button>
    </DialogActions>
  </Dialog>
    </>
  )
}