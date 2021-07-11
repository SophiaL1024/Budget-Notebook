import React from 'react';
import { useContext } from "react";
import dateContext from '../../context';
import Edit from "./edit";
import NewTransactionForm from './newTransactionForm';


export default function IncomeList() {

  const {incomeTransactions,handleEdit,deletion} = useContext(dateContext);
 //mapping over list to creat a table of list items
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
     <div class={"newTransactionForm"}>
          <h3>Name</h3>
          <h3>Description</h3>
          <h3>Amount</h3>
          <h3>Edit</h3>
          <h3>Delete</h3>
          </div>
        
          {listIncomes}
       
    
    </>
  );
};