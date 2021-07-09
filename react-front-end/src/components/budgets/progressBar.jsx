import React ,{useContext}from 'react';
import dateContext from "../../context.js";


export default function BudgetProgressBar(props){
  const {incomeAndBudget,expenseAndBudget} = useContext(dateContext);
  

  if(props.type==="income"){
    
    const income=incomeAndBudget.find(e=>e.id===props.id).income_sum;
    const incomeBudgetAmount=incomeAndBudget.find(e=>e.id===props.id).amount;
    
    return(
      <>
      income progress bar goes here:
      income:{income}<br/>
      incomeBudgetAmount:{incomeBudgetAmount}<br/>
      </>
    )
  }else if(props.type==="expense"){
    const expense=expenseAndBudget.find(e=>e.id===props.id).expense_sum;
    const expenseBudgetAmount=expenseAndBudget.find(e=>e.id===props.id).amount;   

    return(
      <>
      expense progress bar goes here:
      expense:{expense}<br/>
      expenseBudgetAmount:{expenseBudgetAmount}<br/>
      </>
    )
  }

}