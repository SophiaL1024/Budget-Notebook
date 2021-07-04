const Express = require('express');
const router = Express.Router();
const dashBoardQuries = require('../db/queries/dashboardQuries');


router.get('/:id', (req, res) => {
  const dashboardData = {};
  dashBoardQuries.getAnnualExpenseByUserId(req.params.id)
    .then((resolve) => {
      dashboardData.annualExpenseSum = resolve;
    })
    .then(() => {
      dashBoardQuries.getAnnualIncomeByUserId(req.params.id)
        .then(resolve => {
          dashboardData.annualIncomeSum = resolve;
        });
    })
    .then(() => {
      dashBoardQuries.getMonthlyIncomeByUserId(req.params.id, 7)
        .then(resolve => {
          dashboardData.monthlyIncomeSum = resolve;
        });
    })
    .then(() => {
      dashBoardQuries.getMonthlyExpenseByUserId(req.params.id, 7)
        .then(resolve => {
          dashboardData.monthlyExpenseSum = resolve;
        })
        .then(() => {
          res.json(dashboardData);
        });
    });
});


module.exports = router;
