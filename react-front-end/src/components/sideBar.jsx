import React,{useContext} from 'react';
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import  '../App.css';
import dateContext from "../context.js";


const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  }
}));

export default function SideBar() {
  const classes = useStyles();
  // const currentMonth=new Date().getMonth()+1;
  const {month,setMonth,year,setYear} = useContext(dateContext);

  const currentYear=new Date().getFullYear();
  const yearList=[];
  for(let i=2020;i<=currentYear;i++){
    yearList.push(i);
  }
  // const [month, setMonth] = React.useState(currentMonth);
  // const [year, setYear] = React.useState(currentYear);
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
    <div className="side-bar">
  
    <div><Link to="/dashboards/">Dashboard </Link></div>
    <div><Link to="/categories/">Category </Link></div>
    <div><Link to="/budgets/">Budget</Link></div>
    <div><Link to="/transactions/">Transaction</Link></div>
    <div><Link to="/balances/">Balance</Link></div>    

    <div>
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
    </div>
    </div>
  );
}