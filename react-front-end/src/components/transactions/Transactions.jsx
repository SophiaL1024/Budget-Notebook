import React, { useEffect, useState,useContext } from "react";
import axios from "axios";
import IncomeList from "./incomeList";
import ExpenseList from "./expenseList";
import NewTransactionForm from "./newTransactionForm";
import  dateContext  from "../../context";
import Graph from "./Graph";
import FormDrawer from "./formDrawer"

export default function Transactions() {
  const {month,year} = useContext(dateContext);

  const [state, setState] = useState({
    incomeTransactions: [],
    expenseTransactions: [],
    expenseBudget:[],
    incomeBudget:[]
  });

  //handles form state
  const [formValue, setFormValue] = useState({
    name: "",
    description: "",
    amount: 0,
    date:"", 
    year:0,
    month: 0,
    day:0,
    selectedBudgetId:''
  });


  useEffect(() => {
    axios
      .get("http://localhost:3000/transactions/1",{ params: { year,month } })
      .then((res) => {
        setState((prev) => ({ ...prev, expenseTransactions: res.data.expenseInfo, incomeTransactions: res.data.incomeInfo,expenseBudget:res.data.expenseBudget,incomeBudget:res.data.incomeBudget }));
      });
  }, [month,year]);

  // console.log(state)


  const deletion = function (id, type) {
    // console.log("check");
    axios.delete("http://localhost:3000/transactions/", { data: { id, type } })
    .then(() => {
    console.log("check");

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


  const handleEdit = (name, description, amount, month, day, year, id, type) => {
    axios.patch(`http://localhost:3000/transactions/edit`, { data: { name, description, amount, month, day, year, id, type} })
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
  const handleSubmit = (value) => {
    // console.log("value:",value);
    formValue.year=Number(formValue.date.slice(0,4));
    formValue.month=Number(formValue.date.slice(5,7));
    formValue.day=Number(formValue.date.slice(-2));
    console.log("formvalye",formValue)
    axios.post(`http://localhost:3000/transactions/post${value}`, { data: formValue })
      .then((res) => {
        if (value === "income") {
          const newIncomeTransactions = [...state.incomeTransactions];
          newIncomeTransactions.push({
            name: formValue.name,
            description: formValue.description,
            amount: formValue.amount,
            month: formValue.month,
            day: formValue.day,
            year:formValue.year,
            id:res.data,
            incomeBudgetsId:formValue.selectedBudgetId
          });
          // console.log("state.incomeTransactions.length:", state.incomeTransactions.length);
          // console.log("newIncomeTransactions.length:", newIncomeTransactions.length);
           const expenseState = state.expenseTransactions;
           const newState = {
             expenseTransactions: expenseState,
             incomeTransactions: newIncomeTransactions
           }
          //  console.log(newState);
          setState(newState);
          // console.log("newState:",state.incomeTransactions);
        } else if (value === "expense") {
          const newExpenseTransactions = state.expenseTransactions.map(item => { return { ...item } });
          newExpenseTransactions.push({
            name: formValue.name,
            description: formValue.description,
            amount: formValue.amount,
            month: formValue.month,
            day: formValue.day,
            year:formValue.year,
            id:res.data,
            expenseBudgetsId:formValue.selectedBudgetId
          });
          setState(prev => ({
            ...prev,
            expenseTransactions: newExpenseTransactions
          }));
        }
      })
      .then(() => {
        setFormValue({
          name: "",
          description: "",
          amount: 0,
          date:"", 
          year:0,
          month: 0,
          day:0
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
     <dateContext.Provider value={{incomeTransactions: state.incomeTransactions, expenseTransactions: state.expenseTransactions,handleChange,handleSubmit,formValue,expenseBudget:state.expenseBudget,incomeBudget:state.incomeBudget}}>
      <Graph/>

      <IncomeList
        // listOfIncomes={state.incomeTransactions}
        deletion={deletion}
        handleEdit={handleEdit}
      >
      </IncomeList>
      <ExpenseList
        // listOfExpenses={state.expenseTransactions}
        deletion={deletion}
        handleEdit={handleEdit}

      />
      <NewTransactionForm  className='form' />
      {/* <NewTransactionForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        formValue={formValue}
        state={state} /> */}

      <FormDrawer/>

      </dateContext.Provider> 
    </>
  )

}