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

  const deletion = function(id, type) {
    const newList = state.expenseTransactions.filter((item) => item.id !== id);
    setState(newList);
  }

  return (
    <>
    <IncomeList listOfIncomes={state.incomeTransactions}></IncomeList>
    <ExpenseList 
    listOfExpenses={state.expenseTransactions}
    deletion={deletion}
    />
    <NewTransactionForm></NewTransactionForm>
    </>
  )

}