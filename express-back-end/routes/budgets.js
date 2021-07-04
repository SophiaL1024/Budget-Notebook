const Express = require('express');
const router = Express.Router();
const budgetQuries = require('../db/queries/budgetQuries');
const month = new Date().getMonth() + 1;

router.get('/:userId', (req, res) => {
  const budgetData = {};
  budgetQuries.getIncomeBudgetByMonth(req.params.userId,month)
    .then((resolve) => {
      budgetData.incomeBudget = resolve;
    })
    .then(()=>{
      budgetQuries.getExpenseBudgetByMonth(req.params.userId,month)
        .then((resolve) => {
          budgetData.expenseBudget = resolve;
          res.json(budgetData);
        });
    });
});

router.post('/', (req, res) => res.json({
  
}));

router.patch('/', (req, res) => res.json({
  
}));

router.delete('/', (req, res) => res.json({
  
}));

module.exports = router;

