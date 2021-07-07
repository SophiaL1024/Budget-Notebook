import useVisualMode from '../../hooks/useVisualMode';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import React from 'react';
export default function Edit(props) {
  const SHOW = "SHOW";
  const EDIT = "EDIT";

  //function that transitions what is being displayed
  const { mode, transition, back } = useVisualMode(
    SHOW
  );

  const showItem = (
    mode === SHOW && (
      <tr key={props.id}>
        <td><div>{props.name}</div>
          <div>{props.description}</div>
          <div>${props.amount}</div></td>
        <td>
          <IconButton aria-label="edit">
            <EditIcon />
          </IconButton>
          <IconButton aria-label="delete" onClick={() => props.deletion(props.id, 'Income')}>
            <DeleteIcon />
          </IconButton>
        </td>
      </tr>
    )
  )


  return (
    <div>
      {showItem}

    </div>
  );

}