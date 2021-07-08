import React ,{useState}from 'react';
import { Button, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
// import React from 'react';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  edit: {
    '& > *': {
      margin: theme.spacing(1),
      width: '10ch',
    },
  },
}));

export default function EditForm(props) {
  const classes = useStyles();

  const [formValue, setFormValue] = useState({ 
    name: "" ,
    amount: "",
    userId:1   //hard code user_id
  });

  const handleChange = (key,value) => { 
    setFormValue(prev => ({
      ...prev,
      [key]:value  
    }))
  }

 return (
  <form className={classes.edit} noValidate autoComplete="off">

          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            onChange={(event)=>handleChange("amount",event.target.value)}
            value={props.name}
          />
 
          <TextField
            autoFocus
            margin="dense"
            id="amount"
            label="Amount in dollars"
            type="number"
            onChange={(event)=>handleChange("name",event.target.value)}
            value={props.amount}
          />

        <IconButton aria-label="cancel" onClick={() => {props.setEdit(0)}}>
          <Button
            variant="contained"
            color="primary"
            size="small"
            className={classes.button}
            // startIcon={<SaveIcon />}
          >Cancel</Button>
        </IconButton>
        <IconButton aria-label="edit" onClick={() => {}}>
          <Button
            variant="contained"
            color="primary"
            size="small"
            className={classes.button}
            // startIcon={<SaveIcon />}
          >Save</Button>
        </IconButton>

      </form>
    )
 

}