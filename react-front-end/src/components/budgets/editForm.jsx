import React ,{useState,useContext}from 'react';
import axios from "axios";
import dateContext from "../../context.js";
import { Button, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
// import IconButton from '@material-ui/core/IconButton';
// import DeleteIcon from '@material-ui/icons/Delete';
// import EditIcon from '@material-ui/icons/Edit';
// import SaveIcon from '@material-ui/icons/Save';
// import React from 'react';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  edit: {
    '& > *': {
      margin: theme.spacing(1),
      width: '10ch',
    },
  },
}));

export default function EditForm(props) {
  const classes = useStyles();

  const {incomeAndBudget,expenseAndBudget,balanceBudget,setState,month,year} = useContext(dateContext);
//  console.log(month)

  // console.log("props.id-------------",props.id)


  const [formValue, setFormValue] = useState({ 
    name: "" ,
    amount: 0    
  });  

  const handleChange = (key,value) => { 
    setFormValue(prev => ({
      ...prev,
      [key]:value  
    }))
  };

  const handleSave=function(){
  axios.patch('http://localhost:3000/budgets', {data:{formValue,type:props.type,id:props.id,month,year,userId:1}})
    .then((resolve)=>{
      // console.log(resolve)
      // console.log(props.type)

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
    // const newBalanceBudget=balanceBudget.map((e)=>{

    // })
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
            value={props.name}
            
          />
 
          <TextField
            autoFocus
            margin="dense"
            id="amount"
            label="Amount in dollars"
            type="number"
            onChange={(event)=>handleChange("amount",event.target.value)}
            value={props.amount}
          />

        {/* <IconButton aria-label="cancel" onClick={() => {props.setEdit(0)}}> */}
          <Button
            variant="contained"
            color="primary"
            size="small"
            className={classes.button}
            // startIcon={<SaveIcon />}
            onClick={() => {props.setEdit(0)}}
          >Cancel</Button>
          
        {/* </IconButton> */}
        {/* <IconButton aria-label="edit" onClick={handleSave}> */}
          <Button
            variant="contained"
            color="primary"
            size="small"
            className={classes.button}
            onClick={handleSave}
            // startIcon={<SaveIcon />}
          >Save</Button>
        {/* </IconButton> */}

      </form>
    )
 

}