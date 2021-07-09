import React ,{useContext}from 'react';
import dateContext from "../../context.js";


export default function BudgetProgressBar(props){
  const {incomeAndBudget,expenseAndBudget} = useContext(dateContext);
  

  if(props.type==="income"){
    
    const income=Number(incomeAndBudget.find(e=>e.id===props.id).income_sum);
    const incomeBudgetAmount=Number(incomeAndBudget.find(e=>e.id===props.id).amount);

    return(
      <>
      income progress bar goes here:
      income:{income}<br/>
      incomeBudgetAmount:{incomeBudgetAmount}<br/>
      </>
    )
  }else if(props.type==="expense"){
    const expense=Number(expenseAndBudget.find(e=>e.id===props.id).expense_sum);
    const expenseBudgetAmount=Number(expenseAndBudget.find(e=>e.id===props.id).amount);   

    return(
      <>
      expense progress bar goes here:
      expense:{expense}<br/>
      expenseBudgetAmount:{expenseBudgetAmount}<br/>
      </>
    )
  }

}