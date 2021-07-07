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
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

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
  
     <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
        <Paper className={classes.paper}>
        July<br/>
        {/* selected month:{month}<br/> */}
        Income :{state.dashboardData.currentMonthIncome }<br/>
        Expense :{state.dashboardData.currentMonthExpense }<br/>
      </Paper>
      <br/>
      <Grid container spacing={3}>
        <Grid item xs={12}>
        <Paper className={classes.paper}>
        {year}<br/>
        Income :{state.dashboardData.annualIncome }<br/>
        Expense :{state.dashboardData.annualExpense }<br/>
      </Paper>
    </Grid>
 
    {/* balanceBudget:{state.dashboardData.balanceBudget}<br/>
    monthlyBalance:{state.dashboardData.monthlyBalance}<br/> */}
    {/* rechart for the data above */}
  
    </Grid>
    </Grid>
    </Grid>
    </div>
   
  );
}

export default Dashboard;