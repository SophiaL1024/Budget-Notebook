const Express = require('express');
const router = Express.Router();
const dashBoardQuries = require('../db/queries/dashboardQuries');

router.get('/:userId', (req, res) => {

  const dashboardData = {};
  // let monthlyIncome = [];
  // console.log(req.query.year);

  dashBoardQuries.getBalanceBudgetByUserIdYear(req.params.userId, req.query.year)
    .then(resolve => {
      // console.log("saving goal",resolve);

      dashboardData.balanceBudget = resolve;
    })
    .then(() => {
      dashBoardQuries. getMonthlyIncomeByUserIdYear(req.params.userId, req.query.year)
        .then(resolve => {

          //Fill monthly_income for the month with no data
          for (let i = 1; i <= 12; i++) {
            if (!resolve.find(e=>e.month === i)) {
              // eslint-disable-next-line camelcase
              resolve.push({monthly_income:0,month:i});
            }
          }

          dashboardData.monthlyIncome = resolve;

          //Calculate annualIncome
          const incomeArr = resolve.map(e=>Number(e.monthly_income));
          dashboardData.annualIncome = incomeArr.length !== 0 ? incomeArr.reduce((a,b)=>a + b).toFixed(2) : 0;
          // console.log(dashboardData.annualIncome);
        });
    })
    .then(() => {
      dashBoardQuries. getMonthlyExpenseByUserIdYear(req.params.userId, req.query.year)
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

          dashboardData.monthlyBalance = dashboardData.monthlyIncome.map(e=>{

            return {
              month:e.month,
              monthlyBalance:(Number(e.monthly_income) - Number(dashboardData.monthlyExpense.find(element=>element.month === e.month).monthly_expense)).toFixed(2)
            };
          });

          // console.log("in route",dashboardData);
          res.json(dashboardData);
        });
    });

});


module.exports = router;
