import  React,{ useContext,useState} from "react";
import dateContext from "../../context.js";
import axios from 'axios';

import {  TextField, Button, Dialog, DialogActions, DialogContent, DialogContentText,DialogTitle} from "@material-ui/core";

export default function budgetForm(){
  const {incomeAndBudget,expenseAndBudget,setState} = useContext(dateContext);

  const [open, setOpen] = useState(false);
  const [formValue, setFormValue] = useState({ 
    date:"", 
    year:0,
    month: 0,
    amount: "",
    name: "" ,
    userId:1   //hard code user_id
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (key,value) => { 
    setFormValue(prev => ({
      ...prev,
      [key]:value  
    }))
  }

  const handleSubmit = () => {
 
    formValue.year=Number(formValue.date.slice(0,4));
    formValue.month=Number(formValue.date.slice(-2));

    axios.post('http://localhost:3002/budgets', {data:formValue}) 

    .then((resolve) => {

      const newExpenseAndBudget=expenseAndBudget.map(e=>{return {...e}});

      newExpenseAndBudget.push({name:formValue.name,
              amount:formValue.amount,
              month:formValue.month,
              year:formValue.year,
              user_id:1,
              id:resolve.data
              });

      setState((prev) => ({ 
        ...prev,      
        expenseAndBudget: newExpenseAndBudget               
      }));

    })
      //  .then(()=>{
      //    setFormValue({
      //    date:"", 
      //    year:0,
      //    month: 0,
      //    amount: "",
      //    name: ""   
      //    }); 
      //  })
      // })      
      // .catch(err => console.log( err));

      handleClose();
  };



  return (
    <>
    <Button variant="outlined" color="primary" style={{height:"50px",margin:"50px"}} onClick={handleClickOpen}>
        Open form dialog
    </Button>
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
    <DialogTitle id="form-dialog-title">Expense Budget</DialogTitle>
    <DialogContent>
      <DialogContentText>
      Step Two: Set up expense budget
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
        onChange={(event)=>handleChange("date",event.target.value)}           
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