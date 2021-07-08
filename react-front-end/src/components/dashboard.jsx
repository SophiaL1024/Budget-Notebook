import  React,{useEffect, useState,useContext } from "react";
import axios from 'axios';
import dateContext from "../context.js";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(12),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));
const array = ['January', 'February','March','April','May','June','July','August','September','October','November','December']
const month = 7
const balance = [ 
  '794.67', '816.69',
  '805.68', '849.72',
  '835.71', '827.70',
  '18.66', '0','0','0','0','0'
]
const monthlyB = 7

const Dashboard=function(){
  const classes = useStyles();
  const [state, setState] = useState({
    dashboardData:{}
  }); 

  const {month,year} = useContext(dateContext);

  useEffect(() => {
   
    axios
      .get("/dashboards/1", { params: { year,month } } )
      .then((res) => { 
        setState((prev) => ({ ...prev, dashboardData: res.data }));
      });
  }, [month,year]);
  
  return(
      //  <div className={classes.root}>
      <Grid container spacing={2} className={classes.grid}>
        <Grid item xs={6} md={6}>
        <Paper className={classes.paper}>
        <h1>Month : {array[month-1]}</h1><br/>
        {/* selected month:{month}<br/> */}
        <h2>Income :{state.dashboardData.currentMonthIncome }</h2><br/>
        <h2>Expense :{state.dashboardData.currentMonthExpense }</h2><br/>
        <h3>Balance : {balance[month-1]}</h3>
      </Paper>
      </Grid>
        <Grid item xs={6} md={6}>
        <Paper className={classes.paper}>
        <h1>Year : {year}</h1><br/>
        <h2>Income :{state.dashboardData.annualIncome }</h2><br/>
        <h2>Expense :{state.dashboardData.annualExpense }</h2><br/>
        <h3>Balance : 4948.83 </h3>
      </Paper>
    </Grid>
    </Grid>


    /* balanceBudget:{state.dashboardData.balanceBudget}<br/>
    monthlyBalance:{state.dashboardData.monthlyBalance}<br/> */
    /* rechart for the data above */
    /* </div> */
   
  );
}

export default Dashboard;