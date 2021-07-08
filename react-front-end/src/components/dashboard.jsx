import  React,{useEffect, useState,useContext } from "react";
import axios from 'axios';
import dateContext from "../context.js";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {
  BarChart, XAxis,Tooltip, YAxis,Legend,CartesianGrid,Bar
} from "recharts";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text.default,
  },
}));
const array = ['January', 'February','March','April','May','June','July','August','September','October','November','December']
const month = 7
const balance = [ 
  '794.67', '816.69',
  '805.68', '849.72',
  '835.71', '827.70',
  '18.66', '0','0','0','0','0'
];


const data = [
  {
    name: 'January',
    SavingGoal: 500,
    SavingsAcheived: 794.67,

  },
  {
    name: 'February',
    SavingGoal: 500,
    SavingsAcheived: 816.69,

  },
  {
    name: 'March',
    SavingGoal: 500,
    SavingsAcheived: 805.68,
 
  },
  {
    name: 'April',
    SavingGoal: 500,
    SavingsAcheived: 849.72,

  },
  {
    name: 'May',
    SavingGoal: 500,
    SavingsAcheived: 835.71,

  },
  {
    name: 'June',
    SavingGoal: 500,
    SavingsAcheived: 827.70,

  },
  {
    name: 'July',
    SavingGoal: 500,
    SavingsAcheived: 18.66
  
  // },
  // {
  //   name: 'August',
  //   SavingGoal: 500,
  //   SavingsAcheived: 0
  
  // },
  // {
  //   name: 'September',
  //   SavingGoal: 500,
  //   SavingsAcheived: 0
  
  // },
  // {
  //   name: 'October',
  //   SavingGoal: 500,
  //   SavingsAcheived: 0
  
  // },
  // {
  //   name: 'November',
  //   SavingGoal: 500,
  //   SavingsAcheived: 0
  
  // },
  // {
  //   name: 'December',
  //   SavingGoal: 500,
  //   SavingsAcheived: 0
  
  },
];
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
        <Grid item xs={3} md={6}>
        <Paper className={classes.paper}>
        <h1>{array[month-1]}</h1>
        {/* selected month:{month}<br/> */}
        <div class="income">
         <h2>Incomes : {state.dashboardData.currentMonthIncome } CAD </h2> </div>          
          <div class="expense">
           <h2>Expenses : -{state.dashboardData.currentMonthExpense } CAD </h2></div>
            <div class="balance">
              <h2>Balance : {balance[month-1]} CAD</h2>
            </div>
     
      </Paper>
      </Grid>
        <Grid item xs={6} md={6}>
        <Paper className={classes.paper}>
          <div class="year">
            <h1>{year}</h1>
            </div>
              <div class="income">
                <h2>Incomes : {state.dashboardData.annualIncome } CAD </h2>
              </div> 
                <div class="expense">
                  <h2> Expenses : {state.dashboardData.annualExpense } CAD</h2>
                </div>
                    <div class="balance">
                    <h2>Balance : 4948.83 CAD</h2>
                    </div>
        
         {/* balance the array of income - array of expense */}
      </Paper>
    </Grid>
<Grid>
  <Typography>
  <h3>         </h3>
  </Typography>
  
        <BarChart
          width={800}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 0,
            left: 200,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          {/* <Title text = "Saving Goal"/> */}
          <Bar dataKey="SavingGoal" fill="#8884d8" />
          <Bar dataKey="SavingsAcheived" fill="#82ca9d" />
        </BarChart>
    
        </Grid>
        </Grid>
)
};

export default Dashboard;