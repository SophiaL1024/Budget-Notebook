const db = require('../connection');

const getIncomeBudgetByMonth = (id, month) => {
  const queryStatement = `SELECT
  sum(income.amount) AS income_sum, income_budgets.id,income_budgets.name,income_budgets.description,income_budgets.amount,income_categories.name AS income_categories,income_categories.id AS income_categories_id
  FROM income
  JOIN income_budgets ON income.income_budgets_id=income_budgets.id
  JOIN income_categories ON income.income_categories_id=income_categories.id
  WHERE income.month=$2 AND income.user_id=$1
  GROUP BY income_budgets.id , income_categories.id
 `;
  return db.query(queryStatement, [id, month])
    .then((response) => {
      return response.rows;
    })
    .catch(err => console.log(err));
};

const getExpenseBudgetByMonth = (id, month) => {
  const queryStatement = `SELECT
  name,description,amount
  FROM expense_budgets
  WHERE month=$2
  AND user_id=$1
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