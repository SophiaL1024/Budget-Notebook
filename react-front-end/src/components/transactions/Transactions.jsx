import React,{useEffect, useState} from "react";
import axios from "axios";
import IncomeList from "./incomeList";
import ExpenseList from "./expenseList";
import NewTransactionForm from "./newTransactionForm";

export default function Transactions () {
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

  const deletion = function(id, type) {
    const newList = state.expenseTransactions.filter((item) => item.id !== id);
    setState(newList);
  }

  
  const handleSubmit = (value) => {
    formValue.month=formValue.month.slice(-2);
    console.log("handleSubmit called");
    axios.post(`http://localhost:3000/transactions/post${value}`, {data:formValue})
    .then(() => {
      setFormValue({
        name: "",
        description: "",   
        amount: 0,
        month: 0,
        day: 0
      })    
      console.log("handle Submit sent post");
      // handleClose()      
    })
    .catch(err => console.log(err));
  };
   
  const handleChange = (key,value) => {
    setFormValue(prev => ({
      ...prev,
      [key]:value
    }));
  }



  return (
    <>
    <IncomeList listOfIncomes={state.incomeTransactions}></IncomeList>
    <ExpenseList 
    listOfExpenses={state.expenseTransactions}
    deletion={deletion}
    />
    <NewTransactionForm
    handleChange={handleChange}
    handleSubmit={handleSubmit}
    formValue={formValue}
    state={state}/>
    </>
  )

}