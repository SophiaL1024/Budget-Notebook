import React ,{useState,useContext}from 'react';
import axios from "axios";
import dateContext from "../../context.js";
import { Button, TextField,IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CancelIcon from '@material-ui/icons/Cancel';
import SaveIcon from '@material-ui/icons/Save';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(2),
    // width:"5px" 
    // height:"20px"  
  },
  edit: {
    '& > *': {
      margin: theme.spacing(1),
      width: '200px',
    },
  },
}));

export default function EditForm(props) {
  const classes = useStyles();

  const {incomeAndBudget,expenseAndBudget,balanceBudget,setState,month,year} = useContext(dateContext);

  const [formValue, setFormValue] = useState({ 
    name: props.item.name ,
    amount: props.item.amount   
  });  

  // console.log(props.item);

  const handleChange = (key,value) => { 
    setFormValue(prev => ({
      ...prev,
      [key]:value  
    }))
  };

  const handleSave=function(){
  axios.patch('http://localhost:3000/budgets', {data:{formValue,type:props.type,id:props.id,month,year,userId:1}})
    .then((resolve)=>{

      if(props.type==='income'){
        const newIncomeAndBudget=incomeAndBudget.map((e)=>{
          if(e.id===props.id){
            return{
              ...e,
              name:formValue.name,
              amount:formValue.amount
            }
          }else{
            return {...e}
          }
        });
        setState((prev)=>({
         ...prev,      
         incomeAndBudget: newIncomeAndBudget     
        }));
      }else if(props.type==='expense'){
      const newExpenseAndBudget=expenseAndBudget.map((e)=>{
      if(e.id===props.id){
        return{
          ...e,
          name:formValue.name,
          amount:formValue.amount
        }
      }else{
        return {...e}
      }
    });
    setState((prev)=>({
     ...prev,      
     expenseAndBudget: newExpenseAndBudget     
    }));
  }else if(props.type==='balance'){

    setState((prev)=>({
      ...prev,      
      balanceBudget:[formValue.amount,...balanceBudget.slice(1)]    
     }));
  }
})
.then(()=>{
  props.setEdit(0);

})  
}

 return (
  <form className={classes.edit} noValidate autoComplete="off">

          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            onChange={(event)=>handleChange("name",event.target.value)}
            value={formValue.name}
            
          />
 
          <TextField
            autoFocus
            margin="dense"
            id="amount"
            label="Amount in dollars"
            type="number"
            onChange={(event)=>handleChange("amount",event.target.value)}
            value={formValue.amount}
          />

          <Button
            variant="contained"
            color="primary"
            size="small"
            className={classes.button}
            onClick={handleSave}
          >Save</Button>

           
          {/* <IconButton aria-label="save" onClick={handleSave}>
          <SaveIcon   />
          </IconButton> */}

          <Button
            variant="contained"
            color="default"
            size="small"
            className={classes.button}
            onClick={() => {props.setEdit(0)}}
          >Cancel</Button>
          




      </form>
    )
 

}