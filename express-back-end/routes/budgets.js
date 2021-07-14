const Express = require('express');
const router = Express.Router();
const budgetQueries = require('../db/queries/budgetQueries');


router.get('/', (req, res) => {
  const budgetData = {};
  const userId = req.query.userId;

  budgetQueries.getIncomeAndBudget(userId,req.query.month,req.query.year)
    .then((resolve) => {
      if (!resolve.length) {
        // eslint-disable-next-line camelcase
        resolve = [{income_sum:0,id:0,amount:0,name:"",year:req.query.year,month:req.query.month,user_id:userId}];
      }
      budgetData.incomeAndBudget = resolve;
    })
    .then(()=>{
      budgetQueries.getExpenseAndBudget(userId,req.query.month,req.query.year)
        .then((resolve) => {
          if (!resolve.length) {
            // eslint-disable-next-line camelcase
            resolve = [{expense_sum:0,id:0,amount:0,name:"",year:req.query.year,month:req.query.month,user_id:userId}];
          }
          budgetData.expenseAndBudget = resolve;
        });
    })
    .then(()=>{
      budgetQueries.getBalanceBudget(userId,req.query.month,req.query.year)
        .then((resolve) => {
          resolve.forEach(e=>{
            if (!e) {
              e = 0;
            }
          });
          budgetData.balanceBudget = resolve;
          res.json(budgetData);
        });
    });
});


router.post('/', (req, res) => {
  const {name,amount,month,year,userId} = req.body.data.formValue;

  const {tabType} = req.body.data;

  if (tabType === 0) {
    budgetQueries.createIncomeBudget(name,amount,year,month,userId)
      .then(resolve=>{
        budgetQueries.createIncome(year,month,userId,resolve);
        res.json(resolve);
      });
  } else if (tabType === 1) {
    budgetQueries.createExpenseBudget(name,amount,year,month,userId)
      .then(resolve=>{
        budgetQueries.createExpense(year,month,userId,resolve);
        res.json(resolve);
      });
  } else if (tabType === 2) {
    budgetQueries.createBalanceBudget(amount,year,month,userId);
  }
});

router.patch('/', (req, res) => {

  const {type,id,month,year,userId} = req.body.data;
  const {name,amount} = req.body.data.formValue;
  
  if (type === 'income') {
    budgetQueries.updateIncomeBudget(id,amount,name)
      .then((resolve)=>{
        res.json(resolve);
      });

  } else if (type === 'expense') {
    budgetQueries.updateExpenseBudget(id,amount,name)
      .then((resolve)=>{
        res.json(resolve);
      });
  } else if (type === 'balance') {
   
    budgetQueries.updateBalanceBudget(month,year,amount,userId)
      .then((resolve)=>{
        res.json(resolve);
      });
  }
});

router.delete('/', (req, res) => {

  const {id,budgetType} = req.body;
  
  if (budgetType === 'expense') {
    budgetQueries.deleteExpenseBudget(id);
  } else if (budgetType === 'income') {
    budgetQueries.deleteIncomeBudget(id);
  }
});

module.exports = router;

