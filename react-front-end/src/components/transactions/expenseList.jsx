import { useContext } from "react";
import React from 'react';
import dateContext from "../../context";

export default function ExpenseList(props) {

  const {month,year} = useContext(dateContext);

  const findExpenses = function(array,month,year,userId) {
    const wantedItems = [];
    array.forEach(item =>{
      if (item.month === month && item.year === year && item.user_id === userId) {
        wantedItems.push(item);
      }
    });
    return wantedItems;
  };
  const listOfExpenses = findExpenses(props.listOfExpenses,month,year,1)

  const listExpenses = listOfExpenses.map(item => {
    return (
    <ul>
      <span><div>{item.name}</div><div>{item.description}</div></span>
      <span><button>edit</button><button>delete</button></span> 
    </ul>)

  });

 

  return(
  <table>
    <h3>Expense</h3>
    {listExpenses}
  </table>
  );
};