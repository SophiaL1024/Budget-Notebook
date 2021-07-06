const db = require('../connection');

const getIncomeAndBudget = (id, month,year) => {
  console.log("month",month);
  const queryStatement = `SELECT 
  SUM(income.amount) AS income_sum, income_budgets.*
  FROM income
  JOIN income_budgets ON income.income_budgets_id=income_budgets.id 
  WHERE income.month=$2 AND income.user_id=$1 AND income.year=$3
  GROUP BY income_budgets.id
 `;
  return db.query(queryStatement, [id, month,year])
    .then((response) => {
      console.log(response.rows);
      return response.rows;
    })
    .catch(err => console.log(err));
};

const getExpenseAndBudget = (id, month,year) => {
  const queryStatement = `SELECT 
  sum(expense.amount) AS expense_sum, expense_budgets.*
  FROM expense
  JOIN expense_budgets ON expense.expense_budgets_id=expense_budgets.id 
  WHERE expense.month=$2 AND expense.user_id=$1 AND expense.year=$3
  GROUP BY expense_budgets.id
 `;
  return db.query(queryStatement, [id, month,year])
    .then((response) => {
      return response.rows;
    })
    .catch(err => console.log(err));
};


module.exports = {
  getIncomeAndBudget,
  getExpenseAndBudget
};