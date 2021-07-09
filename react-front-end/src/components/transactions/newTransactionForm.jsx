import React from 'react';
import { useState } from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { TextField, Button, Radio, RadioGroup } from '@material-ui/core';
export default function NewTransactionForm(props) {

  const [value, setValue] = useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
    
  };

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
            onChange={(event)=>props.handleChange("name",event.target.value)}
            value={props.formValue.name}  
          />
        </div>
        <div>
          <TextField
            autoFocus
            margin="dense"
            id="description"
            label="Description" 
            type="text" 
            onChange={(event)=>props.handleChange("description",event.target.value)}
            value={props.formValue.description}  
          />
        </div>
        <div>
          <TextField
            autoFocus
            margin="dense"
            id="amount"
            label="Amount in dollars" 
            type="number" 
            onChange={(event)=>props.handleChange("amount",event.target.value)}
            value={props.formValue.amount}  
          />
        </div>
        <div>
          <TextField
            autoFocus
            margin="dense"
            id="month"
            label="Month" 
            type="month" 
            onChange={(event)=>props.handleChange("month",event.target.value)}
            value={props.formValue.month}  
          />
        </div>
        <div>
          <TextField
            autoFocus
            margin="dense"
            id="day"
            label="Day" 
            type="number" 
            onChange={(event)=>props.handleChange("day",event.target.value)}
            value={props.formValue.day}  
          />
        </div>
      </span>
      <span>
        <div>
        <RadioGroup row aria-label="transactionsType" name="transaction" value={value} onChange={handleChange}>
          <FormControlLabel value="income" control={<Radio />} label="Income" />
          <FormControlLabel value="expense" control={<Radio />} label="Expense" />
        </RadioGroup>
        <Button onClick={() =>props.handleSubmit(value)} color="primary">
        Submit
      </Button>
        </div>
      </span>
    </div>
  );
};