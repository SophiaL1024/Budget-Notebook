const db = require('../connection');

const year = new Date().getFullYear();


const getAnnualIncomeByUserId = (id) => {
  const queryStatement = `SELECT
  sum(amount) as annual_income_sum
  FROM income
  WHERE year=${year}
  GROUP by user_id
  HAVING user_id=$1
 `;
  return db.query(queryStatement, [id])
    .then((response) => {
      return response.rows[0].annual_income_sum;
    })
    .catch(err => console.log(err));
};

const getAnnualExpenseByUserId = (id) => {
  const queryStatement = `SELECT
  sum(amount) as annual_expense_sum
  FROM expense
  WHERE year=${year}
  GROUP by user_id
  HAVING user_id=$1
 `;
  return db.query(queryStatement, [id])
    .then((response) => {
      return response.rows[0].annual_expense_sum;
    })
    .catch(err => console.log(err));
};


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

module.exports = {
  getAnnualIncomeByUserId,
  getAnnualExpenseByUserId,
  getMonthlyIncomeByUserId,
  getMonthlyExpenseByUserId
};