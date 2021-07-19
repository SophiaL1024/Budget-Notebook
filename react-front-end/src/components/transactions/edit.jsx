import useVisualMode from '../../hooks/useVisualMode';
import { Button, TextField } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import React, { useState } from 'react';
import { green } from '@material-ui/core/colors';
import { red } from '@material-ui/core/colors';
import { TableCell, TableRow } from "@material-ui/core";


export default function Edit(props) {
  const SHOW = "SHOW";
  const EDIT = "EDIT";


  //function that transitions what is being displayed
  const { mode, transition} = useVisualMode(
    SHOW
  );

  const [name, setName] = useState(props.name || '');
  const [description, setDescription] = useState(props.description || '');
  const [amount, setAmount] = useState(props.amount || '');
  const [year,setYear]=useState(props.year || '');
  const [month,setMonth]=useState(props.month || '');
  const [day,setDay]=useState(props.day || '');

  //handles name state
  const dateHandler = function (event) {
    setYear(Number(event.target.value.slice(0, 4)));
    setMonth(Number(event.target.value.slice(5, 7)));
    setDay(Number(event.target.value.slice(-2)));
  };  

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
         <TableRow key={props.id}>
         <TableCell>{props.year}-{props.month}-{props.day}</TableCell>
         <TableCell>{props.name}</TableCell>
         <TableCell>{props.description}</TableCell>
         <TableCell>${props.amount}</TableCell>
         <TableCell>
         <IconButton aria-label="edit" style={{ marginRight: 15 }} fill="green" onClick={() => transition(EDIT)}>
           <EditIcon style={{ color: green[300] }} />
         </IconButton>
         </TableCell>
         <TableCell>
         <IconButton aria-label="delete" style={{ marginLeft: 15 }} fill="pink" onClick={() => props.deletion(props.id, props.type)}>
            <DeleteIcon style={{ color: red[300] }} />
        </IconButton>
         </TableCell>
         </TableRow>
    )
  );

  const editItem = (
    mode === EDIT && (
      <TableRow>
      <TableCell>
      <TextField
        margin="dense"
        id="date"
        style={{ marginTop: 20 }}
        type="date"
        onChange={dateHandler}   
        />
      </TableCell>

      <TableCell >
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            onChange={nameHandler}
            value={name}
          />
      </TableCell>
      <TableCell>
          <TextField
            autoFocus
            margin="dense"
            id="description"
            label="Description"
            type="text"
            onChange={descriptionHandler}
            value={description}
          />
       </TableCell>
       <TableCell>
          <TextField
            autoFocus
            margin="dense"
            id="amount"
            label="Amount in dollars"
            type="number"
            onChange={amountHandler}
            value={amount}
          />
       </TableCell>
       <TableCell>
        <IconButton aria-label="edit" onClick={() => transition(SHOW)}>
          <Button
            onClick={() => props.handleEdit(name, description, amount,month, day,year, props.id, props.type)}
            variant="contained"
            color="primary"
            size="small"
            startIcon={<SaveIcon />}>
          Save</Button>
        </IconButton>
        </TableCell>
        <TableCell>
        <Button size="small" variant="contained" color="default" onClick={() => transition(SHOW)}>Cancel</Button>
      </TableCell>
      </TableRow>
    )
  )

  return (
    <>
      {showItem}
      {editItem}
    </>
  );

}