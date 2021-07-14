const Express = require('express');
const router = Express.Router();
const dashBoardQueries = require('../db/queries/dashboardQueries');

router.get('/', (req, res) => {
  const dashboardData = {};
  const userId = req.query.userId;
  dashBoardQueries.getBalanceBudgetByUserIdYear(userId, req.query.year)
    .then(resolve => {

      dashboardData.balanceBudget = resolve;
    })
    .then(() => {
      dashBoardQueries. getMonthlyIncomeByUserIdYear(userId, req.query.year)
        .then(resolve => {

          //Fill monthly_income for the month with no data
          for (let i = 1; i <= 12; i++) {
            if (!resolve.find(e=>e.month === i)) {
              // eslint-disable-next-line camelcase
              resolve.push({monthly_income:0,month:i});
            }
          }
          dashboardData.monthlyIncome = resolve;

          const incomeArr = resolve.map(e=>Number(e.monthly_income));
          dashboardData.annualIncome = incomeArr.length !== 0 ? incomeArr.reduce((a,b)=>a + b).toFixed(2) : 0;
      

        });
    })
    .then(() => {
      dashBoardQueries. getMonthlyExpenseByUserIdYear(userId, req.query.year)
        .then(resolve => {
          for (let i = 1; i <= 12; i++) {
            if (!resolve.find(e=>e.month === i)) {
              // eslint-disable-next-line camelcase
              resolve.push({monthly_expense:0,month:i});
            }
          }
          dashboardData.monthlyExpense = resolve;

          const expenseArr = resolve.map(e=>Number(e.monthly_expense));
          dashboardData.annualExpense = expenseArr.length !== 0 ? expenseArr.reduce((a,b)=>a + b).toFixed(2) : 0;
          res.json(dashboardData);
        });
    });

});


module.exports = router;
