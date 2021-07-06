import  React,{useEffect, useState,useContext} from "react";
import axios from 'axios';
import dateContext from "../../context.js";
import BudgetForm from "./budgetForm.jsx";
import BudgetList from "./budgetList.jsx";

export default function Budget(){

  const [state, setState] = useState({
    incomeAndBudget:[],
    expenseAndBudget:[]
  }); 

  const {month,year} = useContext(dateContext);

  useEffect(() => {
   
    axios
      .get("/budgets/1", { params: { year,month } } )
      .then((res) => {
        setState((prev) => ({ ...prev,
          incomeAndBudget: res.data.incomeAndBudget,
          expenseAndBudget: res.data.expenseAndBudget }));
        });

  }, [month,year]);

  

 if(!state.incomeAndBudget.length||!state.expenseAndBudget.length){
    return null
  }

  return(
    <>
   <div>
   incomeBudget:{state.incomeAndBudget[0].income_sum }<br/>
   {/* expenseBudget:{state.expenseBudget[0].name }<br/> */}
   </div>
   <BudgetList />
    <BudgetForm />
  </>
  )
}