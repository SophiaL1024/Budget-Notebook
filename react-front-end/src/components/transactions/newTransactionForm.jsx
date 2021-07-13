import React from 'react';
import { useState } from 'react';
import { useContext } from "react";
import dateContext from '../../context';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { TextField, Button, Radio, RadioGroup, makeStyles } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import useVisualMode from '../../hooks/useVisualMode';
import { color } from '@chakra-ui/react';

const useStyles = makeStyles({
  add: {
    background:"#64b5f6",
    color:"white"
  },
  newTransactionButton: {
    display: "flex",
    justifyContent: "center"
  },
  newTransactionForm: {
    display: "flex",
    justifyContent: "space-between",
    margin: 15
  },
  newFormButtons: {
    display: "flex",
    justifyContent: "space-between",
    margin: 15
  },
  transactionForm: {
    borderStyle: "solid",
    borderColor: "#64b5f6",
    borderRadius: 25,
    borderWidth: 1,
    backgroundColor: "#f5f5f5",
    width: 800,
    marginLeft: 110,
    paddingLeft: 20,
    paddingRight: 20
  },
  title: {
    display: "flex",
    justifyContent: "center",
  }
});

export default function NewTransactionForm(props) {
  const classes = useStyles();
  const { handleChange, handleSubmit, formValue, incomeBudget, expenseBudget } = useContext(dateContext);
  const [type, setType] = useState('income');
  const SHOW = "SHOW";
  const HIDE = "HIDE";
  //function that transitions what is being displayed
  const { mode, transition, back } = useVisualMode(HIDE);

  // responsible for showing new transaction form
  const button = (
   mode === HIDE && (
     <div className={classes.newTransactionButton}>
       <Button onClick={() => transition(SHOW)} className={classes.add}  >
         Add Transaction
       </Button>
     </div>
   )
 )

if (!incomeBudget || !expenseBudget) {
    return (button)
  }


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
      <div className={classes.transactionForm}>
        <h3 className={classes.title}>New transaction</h3>
        <div className={classes.newTransactionForm}>
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
        <div className={classes.newTransactionForm}>
          <RadioGroup row aria-label="transactionsType" style={{paddingTop: 15}} name="transaction" value={type} onChange={handleTypeChange}>
            <FormControlLabel value="income" control={<Radio />} label="Income" />
            <FormControlLabel value="expense" control={<Radio />} label="Expense" />
          </RadioGroup>
          <TextField
            autoFocus
            margin="dense"
            id="date"
            style={{marginTop:20}}
            type="date"
            onChange={(event) => handleChange("date", event.target.value)}
            value={formValue.date}
          />
          <FormControl style={{width:80}}>
            <InputLabel id="demo-simple-select-label"
            style={{height:45}}>Budget</InputLabel>
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