import React from 'react';
import { useState } from 'react';
import axios from "axios";
import { TextField, Button } from '@material-ui/core';
export default function NewTransactionForm(props) {
  //handles form state
  const [formValue, setFormValue] = useState({  
    name: "",
    description: "",
    amount: 0,
    month: 0,
    day: 0
  });
  
  const handleSubmit = () => {
    formValue.month=formValue.month.slice(-2);
    console.log("handleSubmit called");
    axios.post('http://localhost:3000/transactions/post', {data:formValue})
    .then(() => {
      setFormValue({
        name: "",
        description: "",   
        amount: 0,
        month: 0,
        day: 0,
      })    
      console.log("handleSubmit sent post");
      // handleClose()      
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
    <div>
      <h3>New transaction</h3>
      <span>
        <div>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name" 
            type="text" 
            onChange={(event)=>handleChange("name",event.target.value)}
            value={formValue.name}  
          />
        </div>
        <div>
          <TextField
            autoFocus
            margin="dense"
            id="description"
            label="Description" 
            type="text" 
            onChange={(event)=>handleChange("description",event.target.value)}
            value={formValue.description}  
          />
        </div>
        <div>
          <TextField
            autoFocus
            margin="dense"
            id="amount"
            label="Amount in dollars" 
            type="number" 
            onChange={(event)=>handleChange("amount",event.target.value)}
            value={formValue.amount}  
          />
        </div>
        <div>
          <TextField
            autoFocus
            margin="dense"
            id="month"
            label="Month" 
            type="month" 
            onChange={(event)=>handleChange("month",event.target.value)}
            value={formValue.month}  
          />
        </div>
        
        <div>
          <TextField
            autoFocus
            margin="dense"
            id="day"
            label="Day" 
            type="number" 
            onChange={(event)=>handleChange("day",event.target.value)}
            value={formValue.day}  
          />
        </div>
      </span>
      <span>
        <div>
        <input type="checkbox"  name="income" value="Income" />Income
        <input type="checkbox"  name="Expense" value="Expense" />Expense
        <Button onClick={() => handleSubmit()} color="primary">
        Submit
      </Button>
        </div>
      </span>
    </div>
  );
};