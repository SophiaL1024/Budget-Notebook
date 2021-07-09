import React,{useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import NewTransactionForm from "./newTransactionForm";

const useStyles = makeStyles({
  form: {
    width: 250
  }
  // fullList: {
  //   width: "auto"
  // }
});

export default function TemporaryDrawer() {
  // const classes = useStyles();
  const [open, setOpen] = useState(false);

  // const toggleDrawer = ( open) => {
  //   setOpen(true);
  // };



  return (

        <>
          {/* <Button onClick={toggleDrawer( true)}>{"right"}</Button> */}
          <Button onCLick={()=>setOpen(true)}>New</Button> 
          <Drawer
            // anchor={"right"}
            open={open}
            // onClose={toggleDrawer( false)}
          >
            {/* {list()} */}
        <NewTransactionForm  className='form' />
          </Drawer>
          </>

  );
}