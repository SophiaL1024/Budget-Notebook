const Express = require('express');
const router = Express.Router();
const transactionsQueries = require('../db/queries/transactionsQueries');

router.get('/', (req, res) => {
  const transactionsData = {};
  const userId = req.query.userId;
  transactionsQueries.getExpenseTransactionsById(userId,req.query.month,req.query.year)
    .then((resolve) => {
      transactionsData.expenseInfo = resolve.filter(e=>Number(e.amount));
    })
    .then(() => {
      transactionsQueries.getIncomeTransactionsById(userId,req.query.month,req.query.year)
        .then(resolve => {
          transactionsData.incomeInfo = resolve.filter(e=>Number(e.amount));
        });
    })
    .then(() => {
      transactionsQueries.getIncomeBudget(userId,req.query.month,req.query.year)
        .then((resolve)=>{
          transactionsData.incomeBudget = resolve;
        });
    })
    .then(() => {
      transactionsQueries.getExpenseBudget(userId,req.query.month,req.query.year)
        .then(resolve => {
          transactionsData.expenseBudget = resolve;
          res.json(transactionsData);
        });
    });
});

router.post('/', (req, res) => {
 
  const {type} = req.body.data;
  const { name, description, amount, month, day,year,selectedBudgetId,userId } = req.body.data.formValue;

  if (type === "income") {
    transactionsQueries.addIncome(name, description, amount, year, month, day, userId,selectedBudgetId)
      .then(resolve => {
        res.json(resolve);
      });

  } else if (type === "expense") {
    transactionsQueries.addExpense(name, description, amount, year, month, day, userId,selectedBudgetId)
      .then(resolve => {
        res.json(resolve);
      });
  }
});


router.patch('/', (req, res) => {

  const { name, description, amount, month, day, year, id,type} = req.body.data;
  if (type === 'income') {
    transactionsQueries.editIncomeTransactions(name, description, amount, month, day, year, id)
      .then(resolve => {
        res.json(resolve);
      });
  } else if (type === "expense") {
    transactionsQueries.editExpenseTransactions(name, description, amount, month, day, year, id)
      .then(resolve => {
        res.json(resolve);
      });
  }
});

router.delete('/', (req, res) => {
  const { type, id } = req.body;
  if (type === "income") {
    transactionsQueries.deleteIncomeTransactionById(id)
      .then(resolve => {
        res.json(resolve);
      });
  } else if (type === "expense") {
    transactionsQueries.deleteExpenseTransactionById(id)
      .then(resolve => {
        res.json(resolve);
      });
  }
});

module.exports = router;

