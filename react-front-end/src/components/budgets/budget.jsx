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
        // console.log("test",res)
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
    <dateContext.Provider value={{incomeAndBudget:state.incomeAndBudget,expenseAndBudget:state.expenseAndBudget,setState}}>
    <BudgetList />
    <BudgetForm />
    </dateContext.Provider>
  </>
  )
}