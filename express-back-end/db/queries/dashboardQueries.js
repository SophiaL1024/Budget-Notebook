const db = require('../connection');

// Grab the balance budget from database for a specfic user
const getBalanceBudgetByUserIdYear = (id, year) => {
  const queryStatement = `
  SELECT amount,month
  FROM balance_budgets
  WHERE user_id=$1
  AND year=$2
  `;
  return db.query(queryStatement, [id, year])
    .then((response) => {
      return response.rows;
    })
    .catch(err => console.log(err));
};

// Grab the monthly income from database for a specific user
const getMonthlyIncomeByUserIdYear = (id, year) => {
  const queryStatement = `
  SELECT SUM(income.amount) AS monthly_income,month
  FROM income  
  WHERE income.user_id=$1 AND income.year=$2
  GROUP BY income.month
  `;
  return db.query(queryStatement, [id, year])
    .then((response) => {
      return response.rows;
    })
    .catch(err => console.log(err));
};

// Grab the monthly expense from database for a specific user
const getMonthlyExpenseByUserIdYear = (id, year) => {
  const queryStatement = `
  SELECT SUM(expense.amount) AS monthly_expense,month
  FROM expense  
  WHERE expense.user_id=$1 AND expense.year=$2
  GROUP BY expense.month
  `;
  return db.query(queryStatement, [id, year])
    .then((response) => {
      return response.rows;
    })
    .catch(err => console.log(err));
};

module.exports = {
  getBalanceBudgetByUserIdYear,
  getMonthlyIncomeByUserIdYear,
  getMonthlyExpenseByUserIdYear
};