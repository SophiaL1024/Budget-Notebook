import React, { useEffect, useState } from "react";
import axios from "axios";
import IncomeList from "./incomeList";
import ExpenseList from "./expenseList";
import NewTransactionForm from "./newTransactionForm";

export default function Transactions() {
  const [state, setState] = useState({
    incomeTransactions: [],
    expenseTransactions: [],
  });

  //handles form state
  const [formValue, setFormValue] = useState({
    name: "",
    description: "",
    amount: 0,
    month: 0,
    day: 0,
  });


  useEffect(() => {
    axios
      .get("/transactions/1")
      .then((res) => {
        setState((prev) => ({ ...prev, expenseTransactions: res.data.expenseInfo, incomeTransactions: res.data.incomeInfo }));
      });
  }, []);


  const deletion = function (id, type) {
    axios.delete("http://localhost:3000/transactions/", { data: { id, type } })
    if (type === "Income") {
      // creates a new income list with all items except the item being deleted
      const newIncomeTransactions = state.incomeTransactions.filter(item => item.id !== id);
      //updates state with new list
      setState(prev => ({
        ...prev,
        incomeTransactions: newIncomeTransactions
      }));
    } else if (type === "Expense") {
      const newExpenseTransaction = state.expenseTransactions.filter(item => item.id !== id)
      setState(prev => ({
        ...prev,
        expenseTransactions: newExpenseTransaction
      }));
    }
  }


  const handleEdit = (name, description, amount, month, day, year, id, type) => {
    axios.patch(`http://localhost:3000/transactions/edit`, { data: { name, description, amount, month, day, year, id, type} })
      .then(() => {
        if (type === "income") {
          for (let i = 0; i < state.incomeTransactions.length; i++) {
            if (state.incomeTransactions[i].id === id) {
              // console.log("i:",i)
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
              // console.log("i:",i)
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
  const handleSubmit = (value) => {
    // console.log("value:",value);
    formValue.month = formValue.month.slice(-2);
    axios.post(`http://localhost:3000/transactions/post${value}`, { data: formValue })
      .then(() => {
        if (value === "Income") {
          const newIncomeTransactions = state.incomeTransactions.map(item => { return { ...item } });
          newIncomeTransactions.push({
            name: formValue.name,
            description: formValue.description,
            amount: formValue.amount,
            month: formValue.month,
            day: formValue.day
          });
          setState(prev => ({
            ...prev,
            incomeTransactions: newIncomeTransactions
          }));
        } else if (value === "Expense") {
          const newExpenseTransactions = state.expenseTransactions.map(item => { return { ...item } });
          newExpenseTransactions.push({
            name: formValue.name,
            description: formValue.description,
            amount: formValue.amount,
            month: formValue.month,
            day: formValue.day
          });
          setState(prevState => ({
            expenseTransactions: [...prevState.expenseTransactions, formValue]
          }));
        }
      })
      .then(() => {
        setFormValue({
          name: "",
          description: "",
          amount: 0,
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
  }


  return (
    <>
      <IncomeList
        listOfIncomes={state.incomeTransactions}
        deletion={deletion}
        handleEdit={handleEdit}
      >
      </IncomeList>
      <ExpenseList
        listOfExpenses={state.expenseTransactions}
        deletion={deletion}
        handleEdit={handleEdit}

      />
      <NewTransactionForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        formValue={formValue}
        state={state} />
    </>
  )

}