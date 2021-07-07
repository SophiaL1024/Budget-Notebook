const Express = require('express');
const router = Express.Router();
const transactionsQueries = require('../db/queries/transactionsQueries');

router.get('/:id', (req, res) => {
  const transactionsData = {};
  transactionsQueries.getExpenseTransactionsById(req.params.id)
    .then((resolve) => {
      transactionsData.expenseInfo = resolve;
    })
    .then(() => {
      transactionsQueries.getIncomeTransactionsById(req.params.id)
        .then(resolve => {
          transactionsData.incomeInfo = resolve;
          res.json(transactionsData);
        });
    });
});

router.post('/postExpense', (req, res) => {
  // console.log("req body:",req.body.data);
  let {name, description, amount, month, day} = req.body.data;
  const id = 1;
  const year = new Date().getFullYear();
  // console.log(name,amount,year,month,id);
  transactionsQueries.addExpense(name, description, amount, year, month, day, id);
});

router.post('/postIncome', (req, res) => {
  console.log("req body:",req.body.data);
  let {name, description, amount, month, day} = req.body.data;
  const id = 1;
  const year = new Date().getFullYear();
  // console.log(name,amount,year,month,id);
  transactionsQueries.addIncome(name, description, amount, year, month, day, id);
});

router.patch('/', (req, res) => res.json({

}));

router.delete('/delete/:id', (req, res) => {
  const transactionsData = {};
  transactionsQueries.deleteIncomeTransactionById(req.params.id)
    .then((resolve) => {
      transactionsData.incomeInfo = resolve;
    })
    .then(() => {
      transactionsQueries.deleteExpenseTransactionById(req.params.id)
        .then(resolve => {
          transactionsData.expenseInfo = resolve;
          res.json(transactionsData);
        });
    });
});

module.exports = router;

