import { useContext } from "react";
import React from 'react';
import dateContext from "../../context";
import Edit from "./edit";


export default function ExpenseList() {
  const { expenseTransactions, handleEdit, deletion } = useContext(dateContext);

  //mapping over list to creat a table of list items
  const listExpenses = expenseTransactions.map(item => {
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
        type={"expense"}
      />
    );
  });

  return (
    <>
      <div style={{
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

      {listExpenses}


    </>
  );
};