const Express = require('express');
const router = Express.Router();
const dashBoardQuries = require('../db/queries/dashboardQuries');

router.get('/:userId', (req, res) => {

  const dashboardData = {};
  let monthlyIncome = [];
 

  dashBoardQuries.getBalanceBudgetByUserIdYear(req.params.userId, req.query.year)
    .then(resolve => {
      dashboardData.balanceBudget = resolve;
    })
    .then(() => {
      dashBoardQuries. getMonthlyIncomeByUserIdYear(req.params.userId, req.query.year)
        .then(resolve => {

          monthlyIncome = resolve.map(e=>e.monthly_income);
          dashboardData.currentMonthIncome = resolve[req.query.month - 1] ? resolve[req.query.month - 1].monthly_income : 0;
          const incomeArr = resolve.map(e=>Number(e.monthly_income));
          dashboardData.annualIncome = incomeArr.reduce((a,b)=>a + b).toFixed(2);
        });
    })
    .then(() => {
      dashBoardQuries. getMonthlyExpenseByUserIdYear(req.params.userId, req.query.year)
        .then(resolve => {
          const monthlyExpense = resolve.map(e=>e.monthly_expense);
          dashboardData.currentMonthExpense = resolve[req.query.month - 1] ? resolve[req.query.month - 1].monthly_expense : 0;
          const expenseArr = resolve.map(e=>Number(e.monthly_expense));
          dashboardData.annualExpense = expenseArr.reduce((a,b)=>a + b).toFixed(2);

          dashboardData.monthlyBalance = monthlyIncome.map(function(income, index) {
            return (income - monthlyExpense[index]).toFixed(2);
          });
          console.log("in route",dashboardData);
          res.json(dashboardData);
        });
    });

});


module.exports = router;
