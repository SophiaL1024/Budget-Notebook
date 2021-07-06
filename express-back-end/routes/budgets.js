const Express = require('express');
const router = Express.Router();
const budgetQuries = require('../db/queries/budgetQuries');
const month = new Date().getMonth() + 1;

router.get('/:userId', (req, res) => {
  const budgetData = {};
  budgetQuries.getIncomeAndBudget(req.params.userId,req.query.month,req.query.year)
    .then((resolve) => {
      budgetData.incomeAndBudget = resolve;
    })
    .then(()=>{
      budgetQuries.getExpenseAndBudget(req.params.userId,req.query.month,req.query.year)
        .then((resolve) => {
          budgetData.expenseAndBudget = resolve;
          res.json(budgetData);
        });
    });
});


router.post('/', (req, res) => {
  // console.log(req.body.data);
  let {name,amount,month} = req.body.data;
  month = Number(month);
  const id = 1;
  const year = new Date().getFullYear();
  // console.log(name,amount,year,month,id);
  budgetQuries.createIncomeBudget(name,amount,year,month,id);

});

router.patch('/', (req, res) => res.json({
  
}));

router.delete('/', (req, res) => res.json({
  
}));

module.exports = router;

