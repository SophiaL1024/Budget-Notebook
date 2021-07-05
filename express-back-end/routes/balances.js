const Express = require('express');
const router = Express.Router();
const balanceQueries = require('../db/queries/balanceQueries');

router.get('/:id', (req, res) => {
  const balanceData = {};
  balanceQueries.getMonthlyIncomeByUserId(req.params.id, month)
  .then((resolve) => {
    balanceData.monthlyIncomeSum = resolve;
  })

  .then(() => {
  balanceQueries.getMonthlyExpenseByUserId(req.params.id, month)
    .then((resolve) => {
      balanceData.monthlyExpenseSum = resolve;

  // .then(() => {

  // })
      res.json(balanceData);
    });
  });
});






router.post('/', (req, res) => res.json({
  
}));

module.exports = router;