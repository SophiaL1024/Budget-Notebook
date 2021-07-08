import React ,{useContext}from 'react';
import dateContext from "../../context.js";
export default function PieChart(){

  const {incomeAndBudget,expenseAndBudget} = useContext(dateContext);

  let totalIncome=0;
  incomeAndBudget.forEach(element => {
    totalIncome+=Number(element.income_sum);
  });
  let totalExpense=0;
  expenseAndBudget.forEach(element => {
    totalExpense+=Number(element.expense_sum);
  });

  return(
    <>
    "pie chart goes here"<br/>
    totalIncome:{totalIncome}<br/>
    totalExpense:{totalExpense}
    </>
    )
}

//incomeAndBudget looks like this:[{income_sum,id,name,month,year,userId},{},{},{},{},{},{}.......]

// So the Pie chart structure should be :
//incomeAndBudget[0].income_sum/totalIncome, incomeAndBudget[1].income_sum/totalIncome,....

// and show incomeAndBudget[0].name beside each part of pie.