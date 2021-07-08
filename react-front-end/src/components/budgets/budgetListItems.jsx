import  React,{useContext,useState} from "react";
import axios from 'axios';
import dateContext from "../../context.js";
// import useVisualMode from "../../hooks/useVisualMode";
import EditForm from"./editForm";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

export default function BudgetListItems(props){

  const {incomeAndBudget,expenseAndBudget,balanceBudget,setState} = useContext(dateContext);
  const[edit,setEdit]=useState(0);
  const [type,setType]=useState('');

  const handleEdit=function(id,budgetType){
    setEdit(id)
    setType(budgetType);
  }

  const handleDelete=function(id,budgetType,haveTransactions){
    // console.log(haveTransactions,typeof(haveTransactions))

    if(haveTransactions!=="0" && haveTransactions){
      alert('can not delete, this budget has transactions.')
    }else{
      // console.log(id);
      axios.delete('http://localhost:3000/budgets',{data:{id,budgetType}})

      if(budgetType==="income"){

        // console.log("test",budgetType,typeof(budgetType))
        const newIncomeAndBudget =incomeAndBudget.filter(e=>e.id!==id);

        console.log(newIncomeAndBudget)

        setState((prev) => ({ 
          ...prev,      
          incomeAndBudget: newIncomeAndBudget               
        })) 

      }else if (budgetType==="expense"){
        const newExpenseAndBudget =expenseAndBudget.filter(e=>e.id!==id);
  
        setState((prev) => ({ 
          ...prev,      
          expenseAndBudget: newExpenseAndBudget               
        })) 
      }

    }
  }


  const incomeItems=incomeAndBudget.map(e=>{
    if(edit===e.id && type==='income'){
     return (<EditForm setEdit={setEdit}/>)
    }
    return (  
      (<li key={e.id}>
        {e.name} <br />
        {e.amount} <br />
        {e.income_sum}<br/>
        <IconButton aria-label="edit" onClick={()=>handleEdit(e.id,'income')}>
        <EditIcon />
      </IconButton>
      <IconButton aria-label="delete" onClick={()=>handleDelete(e.id,'income',e.income_sum)}>
        <DeleteIcon />
      </IconButton>
      </li>)
    )
  })

  const expenseItems=expenseAndBudget.map(e=>{
    if(edit===e.id && type==='expense'){
      return (<EditForm/>)
     }
    return (    
      <li key={e.id}>
        {e.name} <br />
        {e.amount} <br />
        {e.expense_sum}<br/>
        <IconButton aria-label="edit" onClick={()=>handleEdit(e.id,'expense')} >
        <EditIcon />
      </IconButton >
        <IconButton aria-label="delete" onClick={()=>handleDelete(e.id,'expense',e.expense_sum)}>
        <DeleteIcon />
      </IconButton>
      </li>
    )
  })

  const balanceRemaining=function(){
    let incomeBudgetSum=0;
    incomeAndBudget.forEach(e => {
      incomeBudgetSum+=Number(e.amount);
    });
    let expenseBudgetSum=0;
    expenseAndBudget.forEach(e => {
      expenseBudgetSum+=Number(e.amount);
    });
    return incomeBudgetSum-expenseBudgetSum;
  }

  //conditional render different tabs
  if(props.tabType===0){
    return incomeItems;
  }else if (props.tabType===1){
    return expenseItems;
  }else if(props.tabType===2){
    return (
      <div>
        you have this much of balance left:<br/>
        {balanceRemaining()}<br/>
        {balanceBudget}
        <IconButton aria-label="edit" onClick={()=>handleEdit()} >
        <EditIcon />
      </IconButton >

      </div>
    )
  }


}