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

  // const deletion = function (id, type) {
  //  axios.delete("http://localhost:3000/transactions/delete", {data:{id, type}})
  //  const newExpenseAndBudget = expenseAndBudget.filter(e=>e.id!==id)
  //  if (type === "Income") {
  //   setState(prevState => ({
  //     incomeTransactions: [...prevState.incomeTransactions, type]
  //   }));
  // } else if (type === "Expense") {
  //   setState(prevState => ({
  //     expenseTransactions: [...prevState.expenseTransactions, formValue]
  //   }));
  // }
  // }

  // adds the new transaction to the database via axios call
  const handleSubmit = (value) => {
    formValue.month = formValue.month.slice(-2);
    axios.post(`http://localhost:3000/transactions/post${value}`, { data: formValue })
      .then(() => {
        if (value === "Income") {
          const newIncomeTransactions = state.incomeTransactions.map(item => {return{...item}});
          newIncomeTransactions.push({
            name:formValue.name,
            description:formValue.description,
            amount:formValue.amount,
            month:formValue.month,
            day:formValue.day
          });
          setState(prev=> ({
            ...prev,
            incomeTransactions: newIncomeTransactions
          }));
        } else if (value === "Expense") {
          const newExpenseTransactions = state.expenseTransactions.map(item => {return{...item}});
          newExpenseTransactions.push({
            name:formValue.name,
            description:formValue.description,
            amount:formValue.amount,
            month:formValue.month,
            day:formValue.day
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
        // console.log("handle Submit sent post");
        // handleClose()      
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
      <IncomeList listOfIncomes={state.incomeTransactions}
      // deletion={deletion}
      >
      </IncomeList>
      <ExpenseList
        listOfExpenses={state.expenseTransactions}
        // deletion={deletion}
      />
      <NewTransactionForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        formValue={formValue}
        state={state} />
    </>
  )

}