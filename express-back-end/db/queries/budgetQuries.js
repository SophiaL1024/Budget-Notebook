const db = require('../connection');

const getIncomeBudgetByMonth = (id, month) => {
  const queryStatement = `SELECT
  sum(income.amount) AS income_sum, income_budgets.*
  FROM income
  JOIN income_budgets ON income.income_budgets_id=income_budgets.id 
  WHERE income.month=$2 AND income.user_id=$1
  GROUP BY income_budgets.id
 `;
  return db.query(queryStatement, [id, month])
    .then((response) => {
      return response.rows;
    })
    .catch(err => console.log(err));
};

const getExpenseBudgetByMonth = (id, month) => {
  const queryStatement = `SELECT
  sum(expense.amount) AS expense_sum, expense_budgets.*
  FROM expense
  JOIN expense_budgets ON expense.expense_budgets_id=expense_budgets.id 
  WHERE expense.month=$2 AND expense.user_id=$1
  GROUP BY expense_budgets.id
 `;
  return db.query(queryStatement, [id, month])
    .then((response) => {
      return response.rows;
    })
    .catch(err => console.log(err));
};

module.exports = {
  getIncomeBudgetByMonth,
  getExpenseBudgetByMonth
};