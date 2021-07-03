const db = require('../connection');

const getMonthlyIncomeByUserId = (id) => {
  const queryStatement = `SELECT
  sum(amount) as monthly_income_sum
  FROM income
  HAVING users.id=$1
 `;
  return db.query(queryStatement, [id])
    .then((response) => {
      return response.rows;
    });
};

const getMonthlyExpenseByUserId = (id) => {
  const queryStatement = `SELECT
  sum(amount) as monthly_expense_sum
  FROM expense
  HAVING users.id=$1
 `;
  return db.query(queryStatement, [id])
    .then((response) => {
      return response.rows;
    });
};

module.exports = {
  getMonthlyIncomeByUserId
  
};