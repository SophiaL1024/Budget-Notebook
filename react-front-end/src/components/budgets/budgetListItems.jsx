import  React,{useContext} from "react";
import dateContext from "../../context.js";
import axios from 'axios';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

export default function BudgetListItems(props){

  const {incomeAndBudget,expenseAndBudget,setState} = useContext(dateContext);

  const handleEdit=function(id){

    axios.patch('http://localhost:3002/budgets',{data:{id}})//also need amount in data params
    .then((resolve)=>{

    })
    .catch(err => console.log( err));
  }

  const handleDelete=function(id,budgetType,haveTransactions){
    console.log(typeof(haveTransactions))
    if(!haveTransactions){
      alert('can not delete, this budget has transactions.')
    }else{
      // console.log(id);
      axios.delete('http://localhost:3002/budgets',{data:{id,budgetType}})

      const newExpenseAndBudget =expenseAndBudget.filter(e=>e.id!==id)

      // console.log(newExpenseAndBudget)

      setState((prev) => ({ 
        ...prev,      
        expenseAndBudget: newExpenseAndBudget               
      })) 
    }
  }


  const incomeItems=incomeAndBudget.map(e=>{
    return (    
      <li key={e.id}>
        {e.name} <br />
        {e.amount} <br />
        {e.income_sum}<br/>
        <IconButton aria-label="edit">
        <EditIcon />
      </IconButton>
        <IconButton aria-label="delete">
        <DeleteIcon />
      </IconButton>
      </li>
    )
  })

  const expenseItems=expenseAndBudget.map(e=>{
   
    return (    
      <li key={e.id}>
        {e.name} <br />
        {e.amount} <br />
        {e.expense_sum}<br/>
        <IconButton aria-label="edit" onClick={()=>handleEdit(e.id)} >
        <EditIcon />
      </IconButton >
        <IconButton aria-label="delete" onClick={()=>handleDelete(e.id,'expense',e.expense_sum)}>
        <DeleteIcon />
      </IconButton>
      </li>
    )
  })

  if(props.tabType===0){
    return incomeItems;
  }
  return expenseItems;
}