import React from 'react';
import { useContext } from "react";
import dateContext from '../../context';
import Edit from "./edit";


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
      <table>
        <thead><h3>Income</h3></thead>
        <tbody>
          {listIncomes}
        </tbody>
      </table>
    </>
  );
};