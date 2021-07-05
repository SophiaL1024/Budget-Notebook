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

router.post('/', (req, res) => res.json({

}));

router.patch('/', (req, res) => res.json({

}));

router.delete('/:id', (req, res) => {
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

