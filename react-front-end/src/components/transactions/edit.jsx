import useVisualMode from '../../hooks/useVisualMode';
import { Button, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

export default function Edit(props) {
  const SHOW = "SHOW";
  const EDIT = "EDIT";

  const classes = useStyles();

  //function that transitions what is being displayed
  const { mode, transition, back } = useVisualMode(
    SHOW
  );
  
  //jsx to be returned when state is in SHOW
  const showItem = (
    mode === SHOW && (
      <tr key={props.id}>
        <td><div>{props.name}</div>
          <div>{props.description}</div>
          <div>${props.amount}</div></td>
        <td>
          <IconButton aria-label="edit" onClick={() => transition(EDIT)}>
            <EditIcon />
          </IconButton>
          <IconButton aria-label="delete" onClick={() => props.deletion(props.id, 'Income')}>
            <DeleteIcon />
          </IconButton>
        </td>
      </tr>
    )
  )

  const editItem = (
    mode === EDIT && (
      <td>
        <tr>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            onChange={(event) => props.handleChange("name", event.target.value)}
            value={props.name}
          />
        </tr>
        <tr>
          <TextField
            autoFocus
            margin="dense"
            id="description"
            label="Description"
            type="text"
            onChange={(event) => props.handleChange("description", event.target.value)}
            value={props.description}
          />
        </tr>
        <tr>
          <TextField
            autoFocus
            margin="dense"
            id="amount"
            label="Amount in dollars"
            type="number"
            onChange={(event) => props.handleChange("amount", event.target.value)}
            value={props.amount}
          />
        </tr>
        <IconButton aria-label="edit" onClick={() => transition(SHOW)}>
          <Button
            variant="contained"
            color="primary"
            size="small"
            className={classes.button}
            startIcon={<SaveIcon />}
          >Save</Button>
        </IconButton>
      </td>
    )
  )

  return (
    <div>
      {showItem}
      {editItem}
    </div>
  );

}