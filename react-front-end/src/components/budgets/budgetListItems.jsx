import  React,{useContext,useState} from "react";
import axios from 'axios';
import dateContext from "../../context.js";
// import BudgetProgressBar from "./progressBar";
import BudgetProgressBar from "./progressBar";
import EditForm from"./editForm";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

export default function BudgetListItems(props){

  const {incomeAndBudget,expenseAndBudget,balanceBudget,setState} = useContext(dateContext);
  //set edit to show edit form
  const[edit,setEdit]=useState(0);
  const [type,setType]=useState('');

  const handleEdit=function(id,budgetType){
    setEdit(id);
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

        // console.log(newIncomeAndBudget)

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
     return (<EditForm setEdit={setEdit} id={e.id} type={'income'} key={e.id}/>)
    }
    else if(e.id===0){
      return null
    }
    return (  
      (<li key={e.id}>
        <BudgetProgressBar id={e.id} type={'income'}/><br/>
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
      return (<EditForm setEdit={setEdit} id={e.id} type={'expense'} key={e.id}/>)
     }
     else if(e.id===0){
      return null
    }
    return (    
      <li key={e.id}>
        <BudgetProgressBar id={e.id} type={'expense'}/>
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
  }else if(props.tabType===2 && !edit){
    return (
      <div>
        you have this much of balance left:<br/>
        {balanceRemaining()}<br/>
        {balanceBudget[0]}<br/>
        {balanceBudget[1]}<br/>
        {balanceBudget[2]}
        <IconButton aria-label="edit" onClick={()=>handleEdit(1,'balance')} >
        <EditIcon />
      </IconButton >
  
      </div>
    ) 
  }else if(props.tabType===2 && edit){
    return <EditForm setEdit={setEdit} type={'balance'} key={0}/>
  }
  



}