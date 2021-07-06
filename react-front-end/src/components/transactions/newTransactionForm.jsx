import React from 'react';
import { useState } from 'react';
import axios from "axios";
import { TextField, Button } from '@material-ui/core';
export default function NewTransactionForm(props) {
 

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
        <input type="checkbox"  name="income" value="Income" />Income
        <input type="checkbox"  name="Expense" value="Expense" />Expense
        <Button onClick={() =>props.handleSubmit()} color="primary">
        Submit
      </Button>
        </div>
      </span>
    </div>
  );
};