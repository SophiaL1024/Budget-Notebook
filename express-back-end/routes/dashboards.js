const Express = require('express');
const router = Express.Router();
const dashBoardQuries = require('../db/queries/dashboardQuries');
const month = new Date().getMonth();

router.get('/:userId', (req, res) => {

  const dashboardData = {};
  dashBoardQuries.getAnnualExpenseByUserId(req.params.userId,req.query.year)
    .then((resolve) => {
      dashboardData.annualExpenseSum = resolve;
    })
    .then(() => {
      dashBoardQuries.getAnnualIncomeByUserId(req.params.userId,req.query.year)
        .then(resolve => {
          dashboardData.annualIncomeSum = resolve;
        });
    })
    .then(() => {
      dashBoardQuries.getMonthlyIncomeByUserId(req.params.userId, req.query.month,req.query.year)
        .then(resolve => {
          dashboardData.monthlyIncomeSum = resolve;
        });
    })
    .then(() => {
      dashBoardQuries.getMonthlyExpenseByUserId(req.params.userId, req.query.month,req.query.year)
        .then(resolve => {
          dashboardData.monthlyExpenseSum = resolve;
          res.json(dashboardData);
        });
    });
});


module.exports = router;
