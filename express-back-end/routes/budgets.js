const Express = require('express');
const router = Express.Router();
const budgetQuries = require('../db/queries/budgetQuries');


router.get('/:userId', (req, res) => {
  const budgetData = {};
  // console.log("test",req.params.userId,req.query.month,req.query.year);
  budgetQuries.getIncomeAndBudget(req.params.userId,req.query.month,req.query.year)
    .then((resolve) => {
      // console.log(resolve);

      budgetData.incomeAndBudget = resolve;
    })
    .then(()=>{
      budgetQuries.getExpenseAndBudget(req.params.userId,req.query.month,req.query.year)
        .then((resolve) => {
          // console.log("tessssss",resolve);
          budgetData.expenseAndBudget = resolve;
          // res.json(budgetData);
        });
    })
    .then(()=>{
      budgetQuries.getBalanceBudget(req.params.userId,req.query.month,req.query.year)
        .then((resolve) => {
        // console.log("tessssss",resolve);
          budgetData.balanceBudget = resolve;
          res.json(budgetData);
        });
    });
});


router.post('/', (req, res) => {
  // console.log(req.body.data);

  const {name,amount,month,year,userId} = req.body.data.formValue;

  const {tabType} = req.body.data;

  if (tabType === 0) {
    // console.log(req.body.data);
    budgetQuries.createIncomeBudget(name,amount,year,month,userId)
      .then(resolve=>{
        // console.log("resolve:",year,month,userId,resolve);
        budgetQuries.createIncome(year,month,userId,resolve);
        res.json(resolve);
      });
  } else if (tabType === 1) {
  // console.log(req.body.data);
    budgetQuries.createExpenseBudget(name,amount,year,month,userId)
      .then(resolve=>{
      // console.log("resolve:",year,month,userId,resolve);
        budgetQuries.createExpense(year,month,userId,resolve);
        res.json(resolve);
      });
  } else if (tabType === 2) {
    budgetQuries.createBalanceBudget(amount,year,month,userId);
  }

});

router.patch('/', (req, res) => {
  // console.log(req.body.data);
  const {type,id,month,year,userId} = req.body.data;
  const {name,amount} = req.body.data.formValue;
  
  
  if (type === 'income') {

    budgetQuries.updateIncomeBudget(id,amount,name)
      .then((resolve)=>{
        // console.log(resolve);
        res.json(resolve);
      });

  } else if (type === 'expense') {
    budgetQuries.updateExpenseBudget(id,amount,name)
      .then((resolve)=>{
      // console.log(resolve);
        res.json(resolve);
      });
  } else if (type === 'balance') {
   
    budgetQuries.updateBalanceBudget(month,year,amount,userId)
      .then((resolve)=>{
      // console.log(resolve);
        res.json(resolve);
      });
  }


  // console.log(req.body.data);
  

});

router.delete('/', (req, res) => {

  const {id,budgetType} = req.body;
  
  if (budgetType === 'expense') {
    budgetQuries.deleteExpenseBudget(id);
    // .then(resolve=>{
    //   console.log("delete response",resolve);
    //   res.json(resolve);
    // });
  } else if (budgetType === 'income') {
    budgetQuries.deleteIncomeBudget(id);
  }
  // res.json("");
});

module.exports = router;

