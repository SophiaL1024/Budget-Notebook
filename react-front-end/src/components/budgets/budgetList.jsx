import React, { useState } from "react";
import BudgetListItems from "./budgetListItems.jsx";
import BudgetForm from "./budgetForm.jsx";
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import { AppBar, Tabs, Tab, Typography, Zoom, Fab, Box, Table, TableCell, TableHead, TableRow } from '@material-ui/core';

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
    width: 997,
    position: 'relative',
    minHeight: 200,
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  panel: {
    height: 600,
    width: 1000,
    overflow: "scroll",
    paddingLeft: 30,
    paddingTop: 0,
    color: '#000'
  },
  app_bar: {
    backgroundColor: '#e1f5fe',
  }
}));

export default function budgetList() {

  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = useState(0);

  const handleChange = ( newValue) => {
    setValue(newValue)
  };

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  const fabs = [
    {
      color: 'primary',
      className: classes.fab,
      icon: <AddIcon />,
      label: 'Add',
    },
    {
      color: 'primary',
      className: classes.fab,
      icon: <AddIcon />,
      label: 'Add',
    }
  ];
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <div className={classes.tab_bar}>
      <AppBar position="static" className={classes.app_bar} >
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="action tabs example"
        >
          <Tab label="Income Budget" {...a11yProps(0)} />
          <Tab label="Expense Budget" {...a11yProps(1)} />
          <Tab label="Saving Goal" {...a11yProps(2)} />
        </Tabs>
      </AppBar>

      <TabPanel value={value} index={0} dir={theme.direction} className={classes.panel} >
        <Table stickyHeader={true} size="small">
          <TableHead>
            <TableRow>
              <TableCell>Budget</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Actual Income</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>

          <BudgetListItems tabType={0} />

        </Table>
        <BudgetForm open={open} setOpen={setOpen} tabType={0} />
      </TabPanel>

      <TabPanel value={value} index={1} dir={theme.direction} className={classes.panel}>
        <Table size="small" stickyHeader={true}>
          <TableHead>
            <TableRow>
              <TableCell>Budget</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Actual Income</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>

          <BudgetListItems tabType={1} />

        </Table>
        <BudgetForm open={open} setOpen={setOpen} tabType={1} />
      </TabPanel>

      <TabPanel value={value} index={2} dir={theme.direction} className={classes.panel}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Remaining budget</TableCell>
            <TableCell>Saving Goal</TableCell>
            <TableCell>Actual Balance</TableCell>
            <TableCell>Edit</TableCell>
          </TableRow>
        </TableHead>
        <BudgetListItems tabType={2} />
        </Table>
      </TabPanel>

      {fabs.map((fab, index) => (
        <Zoom
          key={index}
          in={value === index}
          timeout={transitionDuration}
          style={{
            transitionDelay: `${value === index ? transitionDuration.exit : 0}ms`,
            zIndex:'999'
          }}
          unmountOnExit
        >
          <Fab aria-label={fab.label} className={fab.className} color={fab.color} onClick={handleClickOpen}>
            {fab.icon}
          </Fab>
        </Zoom>
      ))}

    </div>
  );
}