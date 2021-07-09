const Express = require('express');
const router = Express.Router();
const transactionsQueries = require('../db/queries/transactionsQueries');

router.get('/:id', (req, res) => {
  const transactionsData = {};
  transactionsQueries.getExpenseTransactionsById(req.params.id,req.query.month,req.query.year)
    .then((resolve) => {
      transactionsData.expenseInfo = resolve;
    })
    .then(() => {
      transactionsQueries.getIncomeTransactionsById(req.params.id,req.query.month,req.query.year)
        .then(resolve => {
          transactionsData.incomeInfo = resolve;
        });
    })
    .then(() => {
      transactionsQueries.getIncomeBudget(req.params.id,req.query.month,req.query.year)
        .then((resolve)=>{
          // console.log("resolve",resolve);
          transactionsData.incomeBudget = resolve;
        });
    })
    .then(() => {
      transactionsQueries.getExpenseBudget(req.params.id,req.query.month,req.query.year)
        .then(resolve => {
          transactionsData.expenseBudget = resolve;
          // console.log("e",transactionsData.expenseBudget);
          // console.log("i",transactionsData.incomeBudget);
          res.json(transactionsData);
        });
    });
});

router.post('/postExpense', (req, res) => {
  // console.log("req body:",req.body.data);
  // eslint-disable-next-line camelcase
  const { name, description, amount, month, day,year,selectedBudgetId } = req.body.data;
  const id = 1;
  // const year = new Date().getFullYear();
  transactionsQueries.addExpense(name, description, amount, year, month, day, id,selectedBudgetId)
    .then(resolve => {
      res.json(resolve);
    });
});

router.post('/postIncome', (req, res) => {
  // eslint-disable-next-line camelcase
  const { name, description, amount, month, day,year,selectedBudgetId  } = req.body.data;
  const id = 1;
  // const year = new Date().getFullYear();
  // console.log("se;ected budget id:",selectedBudgetId);
  transactionsQueries.addIncome(name, description, amount, year, month, day, id,selectedBudgetId)
    .then(resolve => {
      res.json(resolve);
    });
});

router.patch('/edit', (req, res) => {
  const { name, description, amount, month, day, year, id, type } = req.body.data;
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
    console.log("cheking route");
    transactionsQueries.deleteIncomeTransactionById(req.body.id)
      .then(resolve => {
        res.json(resolve);
      });
  } else if (type === "expense") {
    transactionsQueries.deleteExpenseTransactionById(req.body.id)
      .then(resolve => {
        res.json(resolve);
      });
  }

});




module.exports = router;

