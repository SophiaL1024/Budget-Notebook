const Express = require('express');
const db = require('../db/connection');
const router = Express.Router();
const transactionsQueries = require('../db/queries/transactionsQueries');

router.get('/:id', (req, res) => {
  const transactionsData = {};
  transactionsQueries.getExpenseTransactionsByDescription(req.params.id)
    .then((resolve) => {
      transactionsData.expenseInfo = resolve;
      
    })
    .then(() => {
      transactionsQueries.getIncomeTransactionsByDescription(req.params.id)
        .then(resolve => {
          transactionsData.incomeInfo = resolve;
          res.json(transactionsData);
        });
    });
});


// getIncomeTransactionsByName(id)
// message:'get by category or month',
//   message:'get by name',
//   message:'get by category_id and month',
//   getIncomeTransactionsById(id)
//   getIncomeTransactionsById(id)
router.post('/', (req, res) => res.json({

}));

router.patch('/', (req, res) => res.json({

}));

router.delete('/', (req, res) => res.json({

}));

module.exports = router;

