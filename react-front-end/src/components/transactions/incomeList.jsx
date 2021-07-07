import React from 'react';
import { useContext } from "react";
import dateContext from '../../context';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

export default function IncomeList(props) {

  const { month, year } = useContext(dateContext);

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
      <tr key={item.id}>
        <td><div>{item.name}</div><div>{item.description}</div></td>
        <td>
          <IconButton aria-label="edit">
            <EditIcon />
          </IconButton>
          <IconButton aria-label="delete" onClick={()=>props.deletion(item.id,'income')}>
            <DeleteIcon />
          </IconButton>
        </td>
      </tr>);

  });
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