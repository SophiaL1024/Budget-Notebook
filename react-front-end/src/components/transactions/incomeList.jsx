import React from 'react';
import { useContext } from "react";
import dateContext from '../../context';
import Edit from "./edit";
import NewTransactionForm from './newTransactionForm';

// const useStyles = makeStyles((theme) => ({

//   header: {

//   }

// }));

export default function IncomeList() {
  // const classes = useStyles();
  const { incomeTransactions, handleEdit, deletion } = useContext(dateContext);
  //mapping over data list to create a table of list items
  const listIncomes = incomeTransactions.map(item => {
    return (
      <Edit
        key={item.id}
        id={item.id}
        name={item.name}
        month={item.month}
        day={item.day}
        year={item.year}
        user_id={item.user_id}
        description={item.description}
        amount={item.amount}
        handleEdit={handleEdit}
        deletion={deletion}
        type={"income"}
      />
    );

  });


  return (
    <>
      <div  style={{
        display: "flex",
        justifyContent: "space-between",
        margin: 15
      }}>
      
        <h3>Name</h3>
        <h3>Description</h3>
        <h3>Amount</h3>
        
        <div style={{
          display: "flex"
        }}>
        <h3 style={{
          marginRight: 15
        }}>Edit</h3>
        <h3 style={{
          marginLeft: 15
        }}>Delete</h3>
        </div>
      </div>

      {listIncomes}


    </>
  );
};