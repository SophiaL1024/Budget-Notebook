const db = require('../connection');

const getMonthlyIncomeByUserId = (id, month) => {
  const queryStatement = `SELECT
  sum(amount) as monthly_income_sum
  FROM income
  WHERE year=${year}
  AND month=$2
  GROUP by user_id
  HAVING user_id=$1
 `;
  return db.query(queryStatement, [id, month])
    .then((response) => {
      return response.rows[0].monthly_income_sum;
    })
    .catch(err => console.log(err));
};

const getMonthlyExpenseByUserId = (id, month) => {
  const queryStatement = `SELECT
  sum(amount) as monthly_expense_sum
  FROM expense
  WHERE year=${year}
  AND month=$2
  GROUP by user_id
  HAVING user_id=$1
 `;
  return db.query(queryStatement, [id, month])
    .then((response) => {
      return response.rows[0].monthly_expense_sum;
    })
    .catch(err => console.log(err));
};
const getSavingGoalByUserId = (id, month) => {
  const queryStatement = `
  SELECT amount
  FROM balance_budgets
  WHERE month=1
  GROUP BY user_id
  HAVING user_id=1
  `;
  return db.query(queryStatement, [month, id])
    .then((response) => {
      return response.rows;
    })
    .catch(err => console.log(err));
};

module.exports = {
  getMonthlyIncomeByUserId,
  getMonthlyExpenseByUserId,
  getSavingGoalByUserId
};