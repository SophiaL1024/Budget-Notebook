import { useContext, useEffect } from "react";
import React from 'react';
import axios from "axios";
import dateContext from "../../context";

export default function ExpenseList(props) {

  //finds all the list items corresponding with month year and user_id
  const findExpenses = function (array, month, year, userId) {
    const wantedItems = [];
    array.forEach(item => {
      if (item.month === month && item.year === year && item.user_id === userId) {
        wantedItems.push(item);
      }
    });
    return wantedItems;
  };

  //allows arguments month and year to be changed dynamically from the side nav bar
  const { month, year } = useContext(dateContext);

  //assigning list to a variable
  const listOfExpenses = findExpenses(props.listOfExpenses, month, year, 1)



  //mapping over list to creat a table of list items
  const listExpenses = listOfExpenses.map(item => {
    return (
      <tr key={item.id}>
        <td><div>{item.name}</div><div>{item.description}</div></td>
        <td><button>edit</button><button onClick={() => props.deletion(item.id, "expense")}>delete</button></td>
      </tr>)

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