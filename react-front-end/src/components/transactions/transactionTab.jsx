import  React,{ useState,useContext } from "react";
import dateContext from '../../context';
import IncomeList from "./incomeList";
import ExpenseList from "./expenseList";

import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import{AppBar,Tabs,Tab,Typography,Zoom,Fab,Box} from '@material-ui/core';


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`action-tabpanel-${index}`}
      aria-labelledby={`action-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
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


const useStyles = makeStyles((theme) => ({
  tab_bar: {
    backgroundColor: theme.palette.background.paper,
    width: 1000,
    position: 'relative',
    minHeight: 200,
    height:450,
    overflow:"scroll",
    margin: 25
  },
  fab: {
    // position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  }

}));

export default function budgetList() {
  const {deletion,handleEdit} = useContext(dateContext);

  const classes = useStyles();
  const theme = useTheme();
  const [value,setValue]=useState(0); 

  const handleChange = (event, newValue) => {
    setValue(newValue)
  };

  return (
    <div className={classes.tab_bar}>
      <AppBar position="sticky" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="action tabs example"
        >
          <Tab label="Income" {...a11yProps(0)} />
          <Tab label="Expense" {...a11yProps(1)} />

        </Tabs>
      </AppBar>

        <TabPanel value={value} index={0} dir={theme.direction}>
        <IncomeList />
        </TabPanel>

        <TabPanel value={value} index={1} dir={theme.direction}>
        <ExpenseList />
        </TabPanel>

    </div>
  );
}
