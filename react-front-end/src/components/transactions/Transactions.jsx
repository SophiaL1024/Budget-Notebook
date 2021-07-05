import React,{useEffect, useState} from "react";
import axios from "axios";
import IncomeList from "./incomeList";
import ExpenseList from "./expenseList";
import NewTransactionForm from "./newTransactionForm";

export default function Transactions () {
  const [state, setState] = useState({
    incomeTransactions: [],
    expenseTransactions: []
  });
  useEffect(() => {
    axios
      .get("/transactions/1")
      .then((res) => {
        setState((prev) => ({ ...prev, expenseTransactions: res.data.expenseInfo, incomeTransactions: res.data.incomeInfo }));
      });
  }, []);

  return (
    <>
    <IncomeList listOfIncomes={state.incomeTransactions}></IncomeList>
    <ExpenseList listOfExpenses={state.expenseTransactions}></ExpenseList>
    <NewTransactionForm></NewTransactionForm>
    </>
  )

}