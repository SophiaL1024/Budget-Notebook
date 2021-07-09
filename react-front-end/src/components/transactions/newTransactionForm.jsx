import React from 'react';
import { useState } from 'react';
import { useContext } from "react";
import dateContext from '../../context';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { TextField, Button, Radio, RadioGroup } from '@material-ui/core';
// import {  MuiPickersUtilsProvider,KeyboardDatePicker} from '@material-ui/pickers';
// import DateFnsUtils from '@date-io/date-fns';

export default function NewTransactionForm(props) {
  const {handleChange,handleSubmit,formValue} = useContext(dateContext);

  const [value, setValue] = useState('');

  const handleTypeChange = (event) => {
    setValue(event.target.value);
    
  };

  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };


  return (
    <div>
      <h3>New transaction</h3>
      {/* <span> */}
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
            id="month"
            label="Month" 
            type="date" 
            onChange={(event)=>handleChange("date",event.target.value)}
            value={formValue.date}  
 
          />
    
        <div>
        <RadioGroup row aria-label="transactionsType" name="transaction" value={value} onChange={handleTypeChange}>
          <FormControlLabel value="income" control={<Radio />} label="Income" />
          <FormControlLabel value="expense" control={<Radio />} label="Expense" />
        </RadioGroup>

        <Button onClick={() =>handleSubmit(value)} color="primary">
        Submit
      </Button>
        </div>
      {/* </span> */}
    </div>
  );
};