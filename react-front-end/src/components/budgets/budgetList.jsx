import  React,{useEffect, useState,useContext} from "react";
import axios from 'axios';
import PropTypes from 'prop-types';
import dateContext from "../../context.js";
import { makeStyles } from '@material-ui/core/styles';
import {AppBar,Tabs,Tab,Box,Typography,Paper} from '@material-ui/core';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={2}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

// function a11yProps(index) {
//   return {
//     id: `simple-tab-${index}`,
//     'aria-controls': `simple-tabpanel-${index}`,
//   };
// }

// const useStyles = makeStyles((theme) => ({
//   root: {
//     // flexGrow: 1,
//     width:"500px",
//     backgroundColor: theme.palette.background.paper,
//   },
// }));

export default function budgetList() {

  // const [state, setState] = useState({
  //   incomeAndBudget:[],
  //   expenseAndBudget:[]
  // }); 

  // const {month,year} = useContext(dateContext);  
  
  // useEffect(() => {
   
  //   axios
  //     .get("/budgets/1", { params: { year,month } } )
  //     .then((res) => {
  //       setState((prev) => ({ ...prev,
  //         incomeAndBudget: res.data.incomeAndBudget,
  //         expenseAndBudget: res.data.expenseAndBudget }));
  //       });
  
  // }, [month,year]);

  
  //   if(!state.incomeAndBudget.length||!state.expenseAndBudget.length){
  //     return null
  //   }
  // const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div >
      {/* <AppBar > */}
      <Paper>
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" >
          {/* <Tab label="Item One" {...a11yProps(0)} />
          <Tab label="Item Two" {...a11yProps(1)} />     */}
          <Tab label="Item One" />
          <Tab label="Item Two" />         
        </Tabs>
      {/* </AppBar> */}
      <TabPanel value={value} index={0}>     
        {/* incomeBudget:{state.incomeAndBudget[0].income_sum } */}
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      </Paper>
    </div>
  );
}
