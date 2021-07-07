import  React,{ useState} from "react";
import BudgetListItems from "./budgetListItems.jsx";
import PropTypes from 'prop-types';
// import { makeStyles } from '@material-ui/core/styles';
import {AppBar,Tabs,Tab,Box,Typography} from '@material-ui/core';

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

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

// const useStyles = makeStyles((theme) => ({
//   root: {
//     // flexGrow: 1,
//     width:"500px",
//     backgroundColor: theme.palette.background.paper,
//   },
// }));

export default function budgetList() {

  const [value,setValue]=useState(0); 

  // const classes = useStyles();


  const handleChange = (event, newValue) => {
    setValue(newValue)
  };


  return (
    // <div className={classes.root}>
    <div>

      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="Item One" {...a11yProps(0)} />
          <Tab label="Item Two" {...a11yProps(1)} />
        </Tabs>
      </AppBar>



      <TabPanel value={value} index={0}>  
      <BudgetListItems tabType={0}/>    
      </TabPanel>

      <TabPanel value={value} index={1}> 
      <BudgetListItems tabType={1}/>
      </TabPanel>



    </div>
  );
}
