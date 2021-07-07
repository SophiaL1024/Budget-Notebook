const Express = require('express');
const router = Express.Router();
const budgetQuries = require('../db/queries/budgetQuries');


router.get('/:userId', (req, res) => {
  const budgetData = {};
  // console.log("test",req.params.userId,req.query.month,req.query.year);
  budgetQuries.getIncomeAndBudget(req.params.userId,req.query.month,req.query.year)
    .then((resolve) => {
      budgetData.incomeAndBudget = resolve;
    })
    .then(()=>{
      budgetQuries.getExpenseAndBudget(req.params.userId,req.query.month,req.query.year)
        .then((resolve) => {
          console.log("tessssss",resolve);
          budgetData.expenseAndBudget = resolve;
          res.json(budgetData);
        });
    });
});


router.post('/', (req, res) => {

  let {name,amount,month,year,userId} = req.body.data;
  // console.log(req.body.data);
  budgetQuries.createExpenseBudget(name,amount,year,month,userId)
    .then(resolve=>{
      // console.log("resolve:",year,month,userId,resolve);
      budgetQuries.createExpense(year,month,userId,resolve);
      res.json(resolve);
    });

});

router.patch('/', (req, res) => {

});

router.delete('/', (req, res) => {

  const {id,budgetType} = req.body;
  
  if (budgetType === 'expense') {
    budgetQuries.deleteExpenseBudget(id);
  } else {
    budgetQuries.deleteIncomeBudget(id);
  }
  // res.json("");
});

module.exports = router;

