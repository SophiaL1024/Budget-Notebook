import React from 'react';
import { useContext } from "react";
import dateContext from '../../context';

export default function IncomeList(props) {

  const {month,year} = useContext(dateContext);

  const findIncomes = function(array,month,year,userId) {
    const wantedItems = [];
    array.forEach(item =>{
      if (item.month === month && item.year === year && item.user_id === userId) {
        wantedItems.push(item);
      }
    });
    return wantedItems;
  };
  const listOfIncomes = findIncomes(props.listOfIncomes,month,year,1)

  const listIncomes = listOfIncomes.map(item => {
    return (
    <ul key={item.id}>
      <span><div>{item.name}</div><div>{item.description}</div></span>
      <span><button>edit</button><button>delete</button></span> 
    </ul>);

  });
  return(
  <table>
    <h3>Income</h3>
    {listIncomes}
  </table>
  );
};