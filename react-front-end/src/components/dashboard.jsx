import React, { useEffect, useState, useContext } from "react";
import axios from 'axios';
import dataContext from "../context.js";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { BarChart, XAxis, Tooltip, YAxis, Legend, CartesianGrid, Bar } from "recharts";

//theme and styles from Material UI
const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.default,
  },
}));

//Array of month for the dashboard grid
const monthName = ['January', 'February', 'March', 'April', 'May', 'June', 'July','August','September','October','November','December'];

const Dashboard = function () {

  const classes = useStyles();

  const { month, year, userId } = useContext(dataContext);

  const [dashboardData, setState] = useState(
    {
      balanceBudget: [],
      monthlyIncome: [],
      monthlyExpense: [],
      annualIncome: 0,
      annualExpense: 0
    }
  );
  useEffect(() => {
    axios.get("/dashboards", { params: { year, month, userId } })
      .then((res) => {
        setState((prev) => ({
          ...prev,
          balanceBudget: res.data.balanceBudget,
          monthlyIncome: res.data.monthlyIncome,
          monthlyExpense: res.data.monthlyExpense,
          annualIncome: res.data.annualIncome,
          annualExpense: res.data.annualExpense
        }));
      });
  }, [month, year]);

  if (!dashboardData.balanceBudget.length || !dashboardData.monthlyIncome.length || !dashboardData.monthlyExpense.length) {
    return null
  };

  const monthlyBalance = dashboardData.monthlyIncome.map(e => {
    return {
      month: e.month,
      monthlyBalance: (Number(e.monthly_income) - Number(dashboardData.monthlyExpense.find(element => element.month === e.month).monthly_expense)).toFixed(2)
    };
  });


  const barchartData = monthName.map((e, index) => {
    return {
      name: e,
      SavingGoal: Number(dashboardData.balanceBudget.find(e => e.month === index + 1).amount),
      SavingsAcheived: Number(monthlyBalance.find(e => e.month === index + 1).monthlyBalance)
    };
  });

  return (
    // Grid for the monthly income, expense and balance
    <Grid container spacing={8} className={classes.grid}>
      <Grid item xs={4} md={5}>
        <Paper className={classes.paper} elevation={3}>
          <div className="box">
            <h1>{monthName[month - 1]}</h1>
          </div>
          <div className="balance">
            <h2>Balance : ${Number(monthlyBalance.find(e => e.month === month).monthlyBalance).toLocaleString()}</h2>
          </div>
          <div className="income">
            <h2>Incomes : ${Number(dashboardData.monthlyIncome.find(e => e.month === month).monthly_income).toLocaleString()}</h2>
          </div>
          <div className="expense">
            <h2>Expenses : ${Number(dashboardData.monthlyExpense.find(e => e.month === month).monthly_expense).toLocaleString()}</h2></div>
        </Paper>
      </Grid>

      {/* // Grid for the annual expense, income and balance */}
      <Grid item xs={4} md={5}>
        <Paper className={classes.paper} elevation={3}>
          <div className="box">
            <h1>{year}</h1>
            <div className="balance">
              <h2>Balance : ${(Number(dashboardData.annualIncome) - Number(dashboardData.annualExpense)).toLocaleString()}</h2>
            </div>
          </div>
          <div className="income">
            <h2>Incomes : ${Number(dashboardData.annualIncome).toLocaleString()}</h2>
          </div>
          <div className="expense">
            <h2> Expenses : ${Number(dashboardData.annualExpense).toLocaleString()}</h2>
          </div>
        </Paper>
      </Grid>
      {/* <Grid> */}

      {/* Bar chart for savings goal and savings achieved */}
      <Grid item>
        <Paper className={classes.paper} elevation={3}>
          <BarChart
            width={1130}
            height={400}
            data={barchartData}
            margin={{
              top: 5,
              right: 0,
              left: 0,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="SavingGoal" fill="#90caf9" />
            <Bar dataKey="SavingsAcheived" fill="#b2dfdb" />
          </BarChart>
        </Paper>
      </Grid>
    </Grid>
  )
};
export default Dashboard;