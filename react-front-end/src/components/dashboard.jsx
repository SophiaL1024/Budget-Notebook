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
// const month = 7

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
        Month: {array[month-1]}<br/>
        {/* selected month:{month}<br/> */}
        Income :{state.dashboardData.currentMonthIncome }<br/>
        Expense :{state.dashboardData.currentMonthExpense }<br/>
      </Paper>
      </Grid>
        <Grid item xs={6} md={6}>
        <Paper className={classes.paper}>
        Year: {year}<br/>
        Income :{state.dashboardData.annualIncome }<br/>
        Expense :{state.dashboardData.annualExpense }<br/>
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