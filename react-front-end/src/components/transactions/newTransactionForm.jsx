import React from 'react';
import { useState } from 'react';
import { useContext } from "react";
import dateContext from '../../context';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { TextField, Button, Radio, RadioGroup } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


export default function NewTransactionForm(props) {
  const {handleChange,handleSubmit,formValue,incomeBudget,expenseBudget} = useContext(dateContext);

  if(!incomeBudget||!expenseBudget||!incomeBudget.length||!expenseBudget.length ){
    return null
  }

  const [type, setType] = useState('income');

  const handleTypeChange = (event) => {
    setType(event.target.value);
    
  };

  const selectorList=(type)=>{
    if(type==="income"){
      return incomeBudget.map(e=>{
        return (
          <MenuItem value={e.id} key={e.id}>{e.name}</MenuItem>
        )
      })
    }else if(type==="expense"){
      return expenseBudget.map(e=>{
        return (
          <MenuItem value={e.id} key={e.id}>{e.name}</MenuItem>
        )
      })
    }
  }


  return (
    <div>
      <h3>New transaction</h3>

      <RadioGroup row aria-label="transactionsType" name="transaction" value={type} onChange={handleTypeChange}>
          <FormControlLabel value="income" control={<Radio />} label="Income" />
          <FormControlLabel value="expense" control={<Radio />} label="Expense" />
      </RadioGroup>
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
        <TextField
            autoFocus
            margin="dense"
            id="date"

            type="date" 
            onChange={(event)=>handleChange("date",event.target.value)}
            value={formValue.date}
          />
         <br/>

 
        <FormControl > 
        <InputLabel id="demo-simple-select-label">Select Budget</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={formValue.selectedBudgetId}
          onChange={(event)=>handleChange("selectedBudgetId",event.target.value)}
        >
          {selectorList(type)}

        </Select>
      </FormControl>
              
        <div>


        <Button onClick={() =>handleSubmit(type)} color="primary">
        Submit
      </Button>
        </div>

    </div>
  );
};