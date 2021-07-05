import React from 'react';

export default function IncomeList(props) {
  const findExpenses = function(array,month,year,userId) {
    const wantedItems = [];
    array.forEach(item =>{
      if (item.month === month && item.year === year && item.user_id === userId) {
        wantedItems.push(item);
      }
    });
    return wantedItems;
  };
  const listOfIncomes = findExpenses(props.listOfIncomes,2,2021,1)

  const listIncomes = listOfIncomes.map(item => {
    return (
    <ul>
      <span><div>{item.name}</div><div>{item.description}</div></span>
      <span><button>edit</button><button>delete</button></span> 
    </ul>)

  });
  return(
  <table>
    <h3>Income</h3>
    {listIncomes}
  </table>
  );
};