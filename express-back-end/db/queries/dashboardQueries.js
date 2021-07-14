const db = require('../connection');


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