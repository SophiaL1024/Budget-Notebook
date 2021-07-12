import React ,{useContext}from 'react';
import dateContext from "../../context.js";
import { Progress } from "@chakra-ui/react"
import { ChakraProvider } from "@chakra-ui/react"

export default function BudgetProgressBar(props){
  const {incomeAndBudget,expenseAndBudget} = useContext(dateContext);

  if(props.type==="income"){
    
    const income=incomeAndBudget.find(e=>e.id===props.id).income_sum?Number(incomeAndBudget.find(e=>e.id===props.id).income_sum):0;
    const incomeBudgetAmount=Number(incomeAndBudget.find(e=>e.id===props.id).amount);

    
    return(
      <> 
    <ChakraProvider>
      <Progress hasStripe value={(income/incomeBudgetAmount)*100}  />
    </ChakraProvider>
      </>
    )
  }else if(props.type==="expense"){
    const expense=expenseAndBudget.find(e=>e.id===props.id).expense_sum?Number(expenseAndBudget.find(e=>e.id===props.id).expense_sum):0;
    const expenseBudgetAmount=Number(expenseAndBudget.find(e=>e.id===props.id).amount);   

    return(
      <>
      <ChakraProvider>
        <Progress hasStripe value={(expense/expenseBudgetAmount)*100} />
      </ChakraProvider>
      </>
    )
  }

}