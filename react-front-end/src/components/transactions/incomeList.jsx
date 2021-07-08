import React, { useState } from 'react';
import { useContext } from "react";
import dateContext from '../../context';
// import IconButton from '@material-ui/core/IconButton';
// import DeleteIcon from '@material-ui/icons/Delete';
// import EditIcon from '@material-ui/icons/Edit';
// import useVisualMode from '../../hooks/useVisualMode';
import Edit from "./Edit";


export default function IncomeList(props) {

  const { month, year } = useContext(dateContext);

  // finds all the incomes with the desired month, year and user id
  const findIncomes = function (array, month, year, userId) {
    const wantedItems = [];
    array.forEach(item => {
      if (item.month === month && item.year === year && item.user_id === userId) {
        wantedItems.push(item);
      }
    });
    return wantedItems;
  };


  const listOfIncomes = findIncomes(props.listOfIncomes, month, year, 1)

  const listIncomes = listOfIncomes.map(item => {
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
      handleEdit={props.handleEdit}
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