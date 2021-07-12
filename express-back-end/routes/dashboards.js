const Express = require('express');
const router = Express.Router();
const dashBoardQuries = require('../db/queries/dashboardQuries');

router.get('/', (req, res) => {

  const dashboardData = {};
  // console.log("dahsboard req",req.headers.cookie);
  // console.log(req.query.userId);
  const userId = req.query.userId;
  dashBoardQuries.getBalanceBudgetByUserIdYear(userId, req.query.year)
    .then(resolve => {
      // console.log("saving goal",resolve);

      dashboardData.balanceBudget = resolve;
    })
    .then(() => {
      dashBoardQuries. getMonthlyIncomeByUserIdYear(userId, req.query.year)
        .then(resolve => {

          //Fill monthly_income for the month with no data
          for (let i = 1; i <= 12; i++) {
            if (!resolve.find(e=>e.month === i)) {
              // eslint-disable-next-line camelcase
              resolve.push({monthly_income:0,month:i});
            }
          }
          const incomeArr = resolve.map(e=>Number(e.monthly_income));
          dashboardData.annualIncome = incomeArr.length !== 0 ? incomeArr.reduce((a,b)=>a + b).toFixed(2) : 0;
      
          //let the next query wait until dashboardData.monthlyIncome is assigned
          return new Promise(()=>{
            dashboardData.monthlyIncome = resolve;
          });
        });
    })
    .then(() => {
      dashBoardQuries. getMonthlyExpenseByUserIdYear(userId, req.query.year)
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
