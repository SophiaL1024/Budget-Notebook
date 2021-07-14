import React,{useContext} from 'react';
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import  '../App.css';
import dateContext from "../context.js";
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
import { Button } from '@material-ui/core';
const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 100,
    textAlign: "center",
  },
  //drawer
  title: {
    flexGrow: 3,
  },
  //header
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    background: "#64b5f6"

  },
  //sidebar
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    background: '#e1f5fe',
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 3,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(6),
  },
  link: { textDecoration: 'none', 
  color: theme.palette.text.secondary,
  },
}));

export default function SideBar() {
  const classes = useStyles();

  const {month,setMonth,year,setYear,setUserId} = useContext(dateContext);

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
    <>
      <CssBaseline />
      {/* Header  */}
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.toolWrapper}>
          <Typography variant="h6" className={classes.title}>
            Budget Notebook
          </Typography>

          <Button 
            variant="outlined" 
            color="inherit"
            size="small"
            onClick={()=>{
              setUserId('');
              document.cookie.split(";").forEach((c) => {
                document.cookie = c
                  .replace(/^ +/, "")
                  .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
              });
            }}
          >Log out</Button>

        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{paper: classes.drawerPaper }}
        anchor="left"
      >
        {/* Sidebar buttons to each route*/}
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
        
      {/* Sidebar selection of year or month to render data*/}
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
   </>
  );
}