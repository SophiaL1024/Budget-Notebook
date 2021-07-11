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
import useVisualMode from '../../hooks/useVisualMode';


export default function NewTransactionForm(props) {
  const { handleChange, handleSubmit, formValue, incomeBudget, expenseBudget } = useContext(dateContext);
  const [type, setType] = useState('income');
  const SHOW = "SHOW";
  const HIDE = "HIDE";
  //function that transitions what is being displayed
  const { mode, transition, back } = useVisualMode(HIDE);

 

if (!incomeBudget || !expenseBudget) {
    return (button)
  }

   const button = (
    mode === HIDE && (
      <div>
        <Button onClick={() => transition(SHOW)} color="primary">
          Add Transaction
        </Button>
      </div>
    )
  )

  const handleTypeChange = (event) => {
    setType(event.target.value);

  };

  const selectorList = (type) => {
    if (type === "income") {
      return incomeBudget.map(e => {
        return (
          <MenuItem value={e.id} key={e.id}>{e.name}</MenuItem>
        )
      })
    } else if (type === "expense") {
      return expenseBudget.map(e => {
        return (
          <MenuItem value={e.id} key={e.id}>{e.name}</MenuItem>
        )
      })
    }
  }


  const newTransaction = (
    mode === SHOW && (
      <div class={"transactionForm"}>
        <h3>New transaction</h3>
        <div class={"newTransactionForm"}>
          <div>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Name"
              type="text"
              onChange={(event) => handleChange("name", event.target.value)}
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
              onChange={(event) => handleChange("description", event.target.value)}
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
              onChange={(event) => handleChange("amount", event.target.value)}
              value={formValue.amount}
            />
          </div>
        </div>
        <div class={"newTransactionForm"}>
          <RadioGroup row aria-label="transactionsType" name="transaction" value={type} onChange={handleTypeChange}>
            <FormControlLabel value="income" control={<Radio />} label="Income" />
            <FormControlLabel value="expense" control={<Radio />} label="Expense" />
          </RadioGroup>
          <TextField
            autoFocus
            margin="dense"
            id="date"

            type="date"
            onChange={(event) => handleChange("date", event.target.value)}
            value={formValue.date}
          />
          <FormControl style={{width:80}}>
            <InputLabel id="demo-simple-select-label"
            style={{height:45}}>Select Budget</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={formValue.selectedBudgetId}
              onChange={(event) => handleChange("selectedBudgetId", event.target.value) && transition(HIDE)}
            >
              {selectorList(type)}

            </Select>
          </FormControl>
        </div>
        <div class={"newTransactionForm"}>

          <div>
            <Button onClick={() => { handleSubmit(type); transition(HIDE) }} color="primary">
              Submit
            </Button>
          </div>

          <div>
            <Button onClick={() => transition(HIDE)} color="primary">
              cancel
            </Button>
          </div>
          </div>

      </div>
    ));

  return (
    <>
      {button}
      {newTransaction}
    </>
  );
};