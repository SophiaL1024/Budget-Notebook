import  React,{useEffect, useState,useContext} from "react";
import axios from 'axios';
import dateContext from "../../context.js";
import BudgetList from "./budgetList.jsx";
import BudgetPieChart from "./pieChart.jsx";
// import { makeStyles } from '@material-ui/core/styles';
// import Paper from '@material-ui/core/Paper';
// import Grid from '@material-ui/core/Grid';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//   },
//   paper: {
//     padding: theme.spacing(1),
//     textAlign: 'center',
//     color: theme.palette.text.secondary,
//   },
// }));

export default function Budget(){
  // const classes = useStyles();
  const [state, setState] = useState({
    incomeAndBudget:[],
    expenseAndBudget:[],
    balanceBudget:[]
  }); 

  const {month,year,userId} = useContext(dateContext);

  useEffect(() => {
   
    axios
      .get("/budgets", { params: { year,month,userId  } } )
      .then((res) => {
        setState((prev) => ({ ...prev,
          incomeAndBudget: res.data.incomeAndBudget,
          expenseAndBudget: res.data.expenseAndBudget,
          balanceBudget:res.data.balanceBudget }));
        });
  }, [month,year]);

 if(!state.incomeAndBudget||!state.expenseAndBudget||!state.incomeAndBudget.length||!state.expenseAndBudget.length || !state.balanceBudget){
    return null
  }

  return(
  <>
    <dateContext.Provider value={{incomeAndBudget:state.incomeAndBudget,expenseAndBudget:state.expenseAndBudget,balanceBudget:state.balanceBudget,setState,month,year}}>
    <div>
      <BudgetPieChart />
    </div>

    <BudgetList />
    </dateContext.Provider>
  </>
  )
}