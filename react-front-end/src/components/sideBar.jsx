import React,{useContext} from 'react';
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import  '../App.css';
import dateContext from "../context.js";
//Drawer
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 150,
  },

  //drawer
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 3,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(10),
  },
  link: { textDecoration: 'none', 
  color: theme.palette.text.primary
}
}));

export default function SideBar() {
  const classes = useStyles();

  const {month,setMonth,year,setYear} = useContext(dateContext);

  const currentYear=new Date().getFullYear();
  const yearList=[];
  for(let i=2020;i<=currentYear;i++){
    yearList.push(i);
  }

  const [yearOpen, setYearOpen] = React.useState(false);
  const [monthOpen, setMonthOpen] = React.useState(false);

  const handleMonthChange = (event) => { 
      setMonth(event.target.value);
  };

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  const handleYearClose = () => {
    setYearOpen(false);
  };

  const handleYearOpen = () => {
    setYearOpen(true);
  };

  const handleMonthClose = () => {
    setMonthOpen(false);
  };

  const handleMonthOpen = () => {
    setMonthOpen(true);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            Budget Notebook
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.toolbar} />
        <Divider />
        <List>
          <Link to ="/dashboards" className={classes.link}>
          <ListItem button>
          <ListItemIcon>
            <DashboardIcon/>
           </ListItemIcon>
           <ListItemText primary="Dashboard" />
           </ListItem>
          </Link>        
          <Link to ="/budgets" className={classes.link}>
          <ListItem button>
          <ListItemIcon>
            <AccountBalanceWalletIcon/>
           </ListItemIcon>
           <ListItemText primary="Budget" />
           </ListItem>
          </Link> 
          <Link to ="/transactions" className={classes.link}>
          <ListItem button>
          <ListItemIcon>
            <ShoppingCartIcon/>
           </ListItemIcon>
           <ListItemText primary="Transaction" />
           </ListItem>
          </Link> 
        </List>
        <Divider />
  
      <FormControl className={classes.formControl}>
        <InputLabel id="select-year-label">Year</InputLabel>
        <Select
          labelId="select-year-label"
          id="select-year"
          open={yearOpen}
          onClose={handleYearClose}
          onOpen={handleYearOpen}
          value={year}
          onChange={handleYearChange}> 
          {yearList.map(y=><MenuItem key={y} value={y}>{y}</MenuItem>)}       
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel id="select-month-label">Month</InputLabel>
        <Select
          labelId="select-month-label"
          id="select-month"
          open={monthOpen}
          onClose={handleMonthClose}
          onOpen={handleMonthOpen}
          value={month}
          onChange={handleMonthChange}> 
          <MenuItem value={1}>January</MenuItem>
          <MenuItem value={2}>February</MenuItem>
          <MenuItem value={3}>March</MenuItem>
          <MenuItem value={4}>April</MenuItem>
          <MenuItem value={5}>May</MenuItem>
          <MenuItem value={6}>June</MenuItem>
          <MenuItem value={7}>July</MenuItem>
          <MenuItem value={8}>August</MenuItem>
          <MenuItem value={9}>September</MenuItem>
          <MenuItem value={10}>October</MenuItem>
          <MenuItem value={11}>November</MenuItem>
          <MenuItem value={12}>December</MenuItem>
        </Select>
      </FormControl>
      </Drawer>
   </div>
  );
}