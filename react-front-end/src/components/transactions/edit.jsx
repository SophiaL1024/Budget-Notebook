import useVisualMode from '../../hooks/useVisualMode';
import { Button, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import React, { useState } from 'react';
import { green } from '@material-ui/core/colors';
import { red } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

export default function Edit(props) {
  const SHOW = "SHOW";
  const EDIT = "EDIT";


  //function that transitions what is being displayed
  const { mode, transition, back } = useVisualMode(
    SHOW
  );

  const [name, setName] = useState(props.name || '');
  const [description, setDescription] = useState(props.description || '');
  const [amount, setAmount] = useState(props.amount || '');

  const classes = useStyles();

  //handles name state
  const nameHandler = function (event) {
    setName(event.target.value);
  };

  //handles description state
  const descriptionHandler = function (event) {
    setDescription(event.target.value);
  };

  //handles amount state
  const amountHandler = function (event) {
    setAmount(event.target.value);
  };

  //jsx to be returned when state is in SHOW
  const showItem = (
    mode === SHOW && (
    
    
        <div class={"newTransactionForm"}>
          <div>{props.name}</div>
          <div>{props.description}</div>
          <div>${props.amount}</div>
          <IconButton aria-label="edit" fill="green" onClick={() => transition(EDIT)}>
          <EditIcon style={{ color: green[300] }}  />
          </IconButton>


          <IconButton aria-label="delete" fill="pink" onClick={() => props.deletion(props.id, props.type)}>
            <DeleteIcon style={{ color: red[300] }}/>
          </IconButton>
        </div >

    )
  )

  const editItem = (
    mode === EDIT && (
      <div class={"newTransactionForm"}>
        <div>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            onChange={nameHandler}
            value={name}
          />
        </div>
        <div>
          <TextField
            autoFocus
            margin="dense"
            id="description"
            label="Description"
            type="text"
            onChange={descriptionHandler}
            value={description}
          />
        </div>
        <div>
          <TextField
            autoFocus
            margin="dense"
            id="amount"
            label="Amount in dollars"
            type="number"
            onChange={amountHandler}
            value={amount}
          />
        </div>
        <IconButton aria-label="edit" onClick={() => transition(SHOW)}>
          <Button
            onClick={() => props.handleEdit(name, description, amount, props.month, props.day, props.year, props.id, props.type)}
            variant="contained"
            color="primary"
            size="small"
            className={classes.button}
            startIcon={<SaveIcon />}
          >Save</Button>
        </IconButton>
        <Button size="small" style={{height: 31}} variant="contained" color="primary" onClick={() => transition(SHOW)}>
          cancel
        </Button>
      </div>
    )
  )

  return (
    <div>
      {showItem}
      {editItem}
    </div>
  );

}