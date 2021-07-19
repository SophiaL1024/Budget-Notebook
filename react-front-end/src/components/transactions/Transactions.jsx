import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import NewTransactionForm from "./newTransactionForm";
import dataContext from "../../context";
import Graph from "./Graph";
import TransactionTab from "./transactionTab"
import { makeStyles } from "@material-ui/core";
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles((theme) => ({
  mainPage: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
  paper: {
    textAlign: 'left',
    color: theme.palette.text.secondary,
    marginBottom: 30,
    marginTop: 20
  }
}));

export default function Transactions() {
  const { month, year, userId } = useContext(dataContext);

  const [state, setState] = useState({
    incomeTransactions: [],
    expenseTransactions: [],
    expenseBudget: [],
    incomeBudget: []
  });

  //handles form state
  const [formValue, setFormValue] = useState({
    name: "",
    description: "",
    amount: 0,
    date: "",
    year: 0,
    month: 0,
    day: 0,
    selectedBudgetId: '',
    "userId": userId
  });

  const classes = useStyles();

  useEffect(() => {
    axios
      .get("http://localhost:3000/transactions", { params: { year, month, userId } })
      .then((res) => {
        setState((prev) => ({ ...prev, expenseTransactions: res.data.expenseInfo, incomeTransactions: res.data.incomeInfo, expenseBudget: res.data.expenseBudget, incomeBudget: res.data.incomeBudget }));
      });
  }, [month, year]);


  // Handles the deletion of a transaction and updates state
  const deletion = function (id, type) {
    axios.delete("http://localhost:3000/transactions/", { data: { id, type } })
      .then(() => {
        if (type === "income") {
          // creates a new income list with all items except the item being deleted
          const newIncomeTransactions = state.incomeTransactions.filter(item => item.id !== id);
          //updates state with new list
          setState(prev => ({
            ...prev,
            incomeTransactions: newIncomeTransactions
          }));
        } else if (type === "expense") {
          const newExpenseTransaction = state.expenseTransactions.filter(item => item.id !== id);
          setState(prev => ({
            ...prev,
            expenseTransactions: newExpenseTransaction
          }));
        };
      });
  }

  // Handles the edit request of an already existing transaction
  const handleEdit = (name, description, amount, month, day, year, id, type) => {
    axios.patch(`http://localhost:3000/transactions/`, { data: { name, description, amount, month, day, year, id, type } })
      .then(() => {
        if (type === "income") {
          for (let i = 0; i < state.incomeTransactions.length; i++) {
            if (state.incomeTransactions[i].id === id) {
              const newItem = {
                ...state.incomeTransactions[i],
                name,
                description,
                amount,
                month,
                day,
                year,
              }
              const newIncomeArray = state.incomeTransactions.map(item => {
                if (item.id === id) {
                  return newItem;
                }
                return item
              })
              setState(prev => ({
                ...prev,
                incomeTransactions: newIncomeArray
              }));
            }
          }
        } else if (type === "expense") {
          for (let i = 0; i < state.expenseTransactions.length; i++) {
            if (state.expenseTransactions[i].id === id) {
              const newItem = {
                ...state.expenseTransactions[i],
                name,
                description,
                amount,
                month,
                day,
                year,
              }
              const newExpenseArray = state.expenseTransactions.map(item => {
                if (item.id === id) {
                  return newItem;
                }
                return item
              })
              setState(prev => ({
                ...prev,
                expenseTransactions: newExpenseArray
              }));
            }
          }
        }
      });
  }


  // adds the new transaction to the database via axios call
  const handleSubmit = (type) => {
    formValue.year = Number(formValue.date.slice(0, 4));
    formValue.month = Number(formValue.date.slice(5, 7));
    formValue.day = Number(formValue.date.slice(-2));
    axios.post(`http://localhost:3000/transactions/`, { data: { type, formValue } })
      .then((res) => {
        if (type === "income") {
          const newIncomeTransactions = [...state.incomeTransactions];
          newIncomeTransactions.push({
            name: formValue.name,
            description: formValue.description,
            amount: formValue.amount,
            month: formValue.month,
            day: formValue.day,
            year: formValue.year,
            id: res.data,
            incomeBudgetsId: formValue.selectedBudgetId
          });
          const newExpenseBudget = state.expenseBudget;
          const newIncomeBudget = state.incomeBudget;
          const expenseState = state.expenseTransactions;
          const newState = {
            expenseTransactions: expenseState,
            incomeTransactions: newIncomeTransactions,
            expenseBudget: newExpenseBudget,
            incomeBudget: newIncomeBudget
          }
          setState(newState);
        } else if (type === "expense") {
          const newExpenseTransactions = state.expenseTransactions.map(item => { return { ...item } });
          newExpenseTransactions.push({
            name: formValue.name,
            description: formValue.description,
            amount: formValue.amount,
            month: formValue.month,
            day: formValue.day,
            year: formValue.year,
            id: res.data,
            expenseBudgetsId: formValue.selectedBudgetId
          });
          const newExpenseBudget = state.expenseBudget;
          const newIncomeBudget = state.incomeBudget;
          const incomeState = state.incomeTransactions;
          const newState = {
            expenseTransactions: newExpenseTransactions,
            incomeTransactions: incomeState,
            expenseBudget: newExpenseBudget,
            incomeBudget: newIncomeBudget
          }
          setState(newState);
        }
      })
      .then(() => {
        setFormValue({
          name: "",
          description: "",
          amount: 0,
          date: "",
          year: 0,
          month: 0,
          day: 0
        });
      })
      .catch(err => console.log(err));
  };


  const handleChange = (key, value) => {
    setFormValue(prev => ({
      ...prev,
      [key]: value
    }));
  };


  return (
    <div className={classes.mainPage}>
      <dataContext.Provider value={{ incomeTransactions: state.incomeTransactions, expenseTransactions: state.expenseTransactions, handleChange, handleSubmit, formValue, expenseBudget: state.expenseBudget, incomeBudget: state.incomeBudget, deletion, handleEdit }}>
        {/* <Grid > */}
        <Paper className={classes.paper} elevation={3}>
          <Graph />
        </Paper >
        {/* </Grid> */}

        <NewTransactionForm className='form' />
        <Paper className={classes.paper} elevation={3}>
          <TransactionTab />
        </Paper>
      </dataContext.Provider>
    </div>
  )

}