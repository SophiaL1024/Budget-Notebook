import { useContext } from "react";
import React from 'react';
import dateContext from "../../context";
import Edit from "./edit";


export default function ExpenseList() {
  const {expenseTransactions,handleEdit,deletion} = useContext(dateContext);

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
      <h3>Expense</h3>
      <table>
        <tbody>
          {listExpenses}
        </tbody>
      </table>
    </>
  );
};