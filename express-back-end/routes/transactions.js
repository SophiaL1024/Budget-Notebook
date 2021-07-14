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
          // console.log("resolve",resolve);
          transactionsData.incomeBudget = resolve;
        });
    })
    .then(() => {
      transactionsQueries.getExpenseBudget(userId,req.query.month,req.query.year)
        .then(resolve => {
          transactionsData.expenseBudget = resolve;
          // console.log("e",transactionsData.expenseBudget);
          // console.log("i",transactionsData.incomeBudget);
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
    // console.log(req.body.data.formValue);
    transactionsQueries.addExpense(name, description, amount, year, month, day, userId,selectedBudgetId)
      .then(resolve => {
        res.json(resolve);
      });
  }
});

// router.post('/', (req, res) => {
//   // eslint-disable-next-line camelcase
//   const { name, description, amount, month, day,year,selectedBudgetId  } = req.body.data.formValue;
//   const id = 1;
//   // const year = new Date().getFullYear();
//   // console.log("se;ected budget id:",selectedBudgetId);
//   transactionsQueries.addIncome(name, description, amount, year, month, day, id,selectedBudgetId)
//     .then(resolve => {
//       res.json(resolve);
//     });
// });

router.patch('/', (req, res) => {

  const { name, description, amount, month, day, year, id,type} = req.body.data;
  // console.log("type",type);
  if (type === 'income') {
    transactionsQueries.editIncomeTransactions(name, description, amount, month, day, year, id)
      .then(resolve => {
        res.json(resolve);
      });
  } else if (type === "expense") {
    transactionsQueries.editExpenseTransactions(name, description, amount, month, day, year, id)
      .then(resolve => {
        // console.log("edited",resolve);
        res.json(resolve);
      });
  }
});

router.delete('/', (req, res) => {
  const { type, id } = req.body;
  if (type === "income") {
    // console.log("cheking route");
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

