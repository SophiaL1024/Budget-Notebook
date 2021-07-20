import React, { useState } from "react";
// import { makeStyles } from "@material-ui/core/styles";
import {Drawer,IconButton} from "@material-ui/core";
import AddIcon from '@material-ui/icons/AddCircle';
import NewTransactionForm from "./newTransactionForm";

export default function TemporaryDrawer() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <IconButton className="transaction-add-btn"  variant="contained" onClick={() => setOpen(true)}>
        <AddIcon fontSize="large" className="transaction-add-icon"/>
        </IconButton>
      <Drawer open={open} onClose={() => setOpen(false)} anchor='right'>
        <NewTransactionForm setOpen={setOpen}/>
      </Drawer>
    </>
  );
}