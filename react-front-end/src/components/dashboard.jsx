import  React,{useEffect, useState,useContext } from "react";
import axios from 'axios';
import dateContext from "../context.js";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {  BarChart, XAxis,Tooltip, YAxis,Legend,CartesianGrid,Bar} from "recharts";
// import { Typography } from "@material-ui/core";

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
const monthName = ['January', 'February','March','April','May','June','July','August','September','October','November','December'];

const Dashboard=function(){
  const classes = useStyles();
  const [ dashboardData, setState] = useState(
    {balanceBudget:[],
    monthlyIncome:[],
    monthlyExpense:[],
    monthlyBalance:[],
    annualIncome:0,
    annualExpense:0}
  ); 

  const {month,year,userId} = useContext(dateContext);

  useEffect(() => {

    axios.get("/dashboards/", { params: { year,month,userId }} )
      .then((res) => {         
        setState((prev) => ({ ...prev, 
        balanceBudget:res.data.balanceBudget,
        monthlyIncome:res.data.monthlyIncome,
        monthlyExpense:res.data.monthlyExpense,
        monthlyBalance:res.data.monthlyBalance,
        annualIncome:res.data.annualIncome,
        annualExpense:res.data.annualExpense
        }));
      });
  }, [month,year]);

  if(!dashboardData.balanceBudget.length||!dashboardData.monthlyIncome.length || !dashboardData.monthlyExpense||!dashboardData.monthlyBalance.length){
    return null
  }

  const barchartData=monthName.map((e,index)=>{
    return{
      name:e,
      SavingGoal: Number(dashboardData.balanceBudget.find(e=>e.month===index+1).amount),
      SavingsAcheived: Number(dashboardData.monthlyBalance.find(e=>e.month===index+1).monthlyBalance)
    }
  })

  return(
    
 
      <Grid container spacing={2} className={classes.grid}>
        <Grid item xs={3} md={6}>
        <Paper className={classes.paper}>
        <h1>{monthName[month-1]}</h1>
 
        <div className="balance">
          <h2>Balance : ${Number(dashboardData.monthlyBalance.find(e=>e.month===month).monthlyBalance).toLocaleString()}</h2>
        </div>
          <div className="income">
          <h2>Incomes : ${Number(dashboardData.monthlyIncome.find(e=>e.month===month).monthly_income).toLocaleString() }</h2> 
          </div>          
            <div className="expense">
            <h2>Expenses : ${Number(dashboardData.monthlyExpense.find(e=>e.month===month).monthly_expense).toLocaleString()}</h2></div>
      </Paper>
      </Grid>
        <Grid item xs={6} md={6}>
        <Paper className={classes.paper}>
          <div className="year">
            <h1>{year}</h1>
              <div className="balance">
              <h2>Balance : ${(Number(dashboardData.annualIncome)-Number(dashboardData.annualExpense)).toLocaleString()}</h2>
              </div>
              </div>
                <div className="income">
                  <h2>Incomes : ${Number(dashboardData.annualIncome).toLocaleString() }</h2>
                </div> 
                  <div className="expense">
                    <h2> Expenses : ${Number(dashboardData.annualExpense).toLocaleString() }</h2>
                  </div>
      </Paper>
    </Grid>
<Grid>
 
  
        <BarChart
          width={800}
          height={300}
          data={barchartData}
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
          <Bar dataKey="SavingGoal" fill="#8884d8" />
          <Bar dataKey="SavingsAcheived" fill="#82ca9d" />
        </BarChart>
    
        </Grid>
        </Grid>
)
};

export default Dashboard;