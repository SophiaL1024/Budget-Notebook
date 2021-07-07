import React, { useState } from 'react';
import { useContext } from "react";
import dateContext from '../../context';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import useVisualMode from '../../hooks/useVisualMode';

export default function IncomeList(props) {
  const SHOW = "SHOW";
  const EDIT = "EDIT";

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

    //function that transitions what is being displayed
    const { mode, transition, back } = useVisualMode(
      SHOW 
    );

  const listOfIncomes = findIncomes(props.listOfIncomes, month, year, 1)

  const listIncomes = listOfIncomes.map(item => {
    return (
      <tr key={item.id}>
        <td><div>{item.name}</div>
        <div>{item.description}</div>
        <div>${item.amount}</div></td>
        <td>
          <IconButton aria-label="edit">
            <EditIcon />
          </IconButton>
          <IconButton aria-label="delete" onClick={()=>props.deletion(item.id,'Income')}>
            <DeleteIcon />
          </IconButton>
        </td>
      </tr>
    );

  });

  // const edit = currentIncome? true : false;

  return (
    <>
      <h3>Income</h3>
      
      <table>
        <tbody>
          {listIncomes}
        </tbody>
      </table>
    </>
  );
};