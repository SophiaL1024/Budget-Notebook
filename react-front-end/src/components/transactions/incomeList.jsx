import React from 'react';

export default function IncomeList(props) {
  const listOfIncomes = props.listOfIncomes;
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