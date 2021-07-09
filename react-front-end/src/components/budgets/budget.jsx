import  React,{useEffect, useState,useContext} from "react";
import axios from 'axios';
import dateContext from "../../context.js";
import BudgetList from "./budgetList.jsx";
import BudgetPieChart from "./pieChart.jsx";

export default function Budget(){

  const [state, setState] = useState({
    incomeAndBudget:[],
    expenseAndBudget:[],
    balanceBudget:[]
  }); 

  const {month,year} = useContext(dateContext);

  useEffect(() => {
   
    axios
      .get("/budgets/1", { params: { year,month } } )
      .then((res) => {
        // console.log("test",res)
        setState((prev) => ({ ...prev,
          incomeAndBudget: res.data.incomeAndBudget,
          expenseAndBudget: res.data.expenseAndBudget,
          balanceBudget:res.data.balanceBudget }));
        });

  }, [month,year]);

  

 if(!state.incomeAndBudget.length||!state.expenseAndBudget.length || !state.balanceBudget){
    return null
  }

  return(
    <>
    <dateContext.Provider value={{incomeAndBudget:state.incomeAndBudget,expenseAndBudget:state.expenseAndBudget,balanceBudget:state.balanceBudget,setState,month,year}}>
  
    <BudgetList />
    <BudgetPieChart />
    </dateContext.Provider>
  </>
  )
}