import React from 'react';
import { useState } from 'react';
import { useContext } from "react";
import dataContext from '../../context';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { TextField, Button, Radio, RadioGroup, makeStyles } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles({
  transactionForm: {
    borderStyle: "solid",
    borderColor: "#64b5f6",
    borderRadius: 25,
    borderWidth: 1,
    backgroundColor: "#fff",
    width: 400,
    margin: 50,
    padding:50
  },

  dateInput: {
    width: 260
  }
});

export default function NewTransactionForm(props) {
  const classes = useStyles();
  const { handleChange, handleSubmit, formValue, incomeBudget, expenseBudget } = useContext(dataContext);
  const [type, setType] = useState('income');
  if (!incomeBudget || !expenseBudget) {
    return null;
  };
  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  const selectorList = (type) => {
    if (type === "income") {
      return incomeBudget.map(e => {
        return (
          <MenuItem value={e.id} key={e.id}>{e.name}</MenuItem>
        );
      });
    } else if (type === "expense") {
      return expenseBudget.map(e => {
        return (
          <MenuItem value={e.id} key={e.id}>{e.name}</MenuItem>
        );
      });
    };
  };


  const newTransaction = (

      <div className={classes.transactionForm}>
        <h3 className='transaction-form-title'>New Transaction</h3>
   
          <div>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Title"
              type="text"
              onChange={(event) => handleChange("name", event.target.value)}
              value={formValue.name}
            />
          </div>
          <div>
            <TextField
              margin="dense"
              id="description"
              label="Description"
              type="text"
              onChange={(event) => handleChange("description", event.target.value)}
              value={formValue.description}
            />
          </div>
          <div>
            <TextField   
              margin="dense"
              id="amount"
              label="Amount"
              type="number"
              onChange={(event) => handleChange("amount", event.target.value)}
              value={formValue.amount}
            />
          </div>
   
     
          <RadioGroup row aria-label="transactionsType" style={{ paddingTop: 15 }} name="transaction" value={type} onChange={handleTypeChange}>
            <FormControlLabel value="income" control={<Radio />} label="Income" />
            <FormControlLabel value="expense" control={<Radio />} label="Expense" />
          </RadioGroup>
          <TextField
            className={classes.dateInput}
            margin="dense"
            id="date"
            style={{ marginTop: 20 }}
            type="date"
            onChange={(event) => handleChange("date", event.target.value)}
            value={formValue.date}
          />
          <FormControl style={{ width: 270 }}>
            <InputLabel id="demo-simple-select-label"
              style={{ height: 45 }}>Budget</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={formValue.selectedBudgetId}
              onChange={(event) => handleChange("selectedBudgetId", event.target.value) }
            >
              {selectorList(type)}

            </Select>
          </FormControl>

          <div className="transaction-form-btn">
            <Button onClick={() => {handleSubmit(type);props.setOpen(false);} } color="primary" variant="contained">
              Submit
            </Button>
  
            <Button onClick={()=>props.setOpen(false)} color="default" >
              Cancel
            </Button>
          </div>
        </div>

    );

  return (
    <>
      {newTransaction}
    </>
  );
};