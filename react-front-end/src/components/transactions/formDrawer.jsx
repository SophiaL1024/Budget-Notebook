import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import NewTransactionForm from "./newTransactionForm";

const useStyles = makeStyles({
  form: {
    width: 250
  }
});

export default function TemporaryDrawer() {

  const [open, setOpen] = useState(false);

  return (
    <>
      {/* <Button onClick={toggleDrawer( true)}>{"right"}</Button> */}
      <Button onCLick={() => setOpen(true)}>New</Button>
      <Drawer open={open}>
        {/* {list()} */}
        <NewTransactionForm className='form' />
      </Drawer>
    </>
  );
}