const db = require('../connection');

// const year = new Date().getFullYear();


const getAnnualIncomeByUserId = (id,year) => {
  const queryStatement = `SELECT
  sum(amount) as annual_income_sum
  FROM income
  WHERE year=$2
  GROUP by user_id
  HAVING user_id=$1
 `;
  return db.query(queryStatement, [id,year])
    .then((response) => {
      return response.rows[0].annual_income_sum;
    })
    .catch(err => console.log(err));
};

const getAnnualExpenseByUserId = (id,year) => {
  const queryStatement = `SELECT
  sum(amount) as annual_expense_sum
  FROM expense
  WHERE year=$2
  GROUP by user_id
  HAVING user_id=$1
 `;
  return db.query(queryStatement, [id,year])
    .then((response) => {
      return response.rows[0].annual_expense_sum;
    })
    .catch(err => console.log(err));
};


const getMonthlyIncomeByUserId = (id, month,year) => {
  const queryStatement = `SELECT
  sum(amount) as monthly_income_sum
  FROM income
  WHERE year=$3
  AND month=$2
  GROUP by user_id
  HAVING user_id=$1
 `;
  return db.query(queryStatement, [id, month,year])
    .then((response) => {
      return response.rows[0].monthly_income_sum;
    })
    .catch(err => console.log(err));
};

const getMonthlyExpenseByUserId = (id, month,year) => {
  const queryStatement = `SELECT
  sum(amount) as monthly_expense_sum
  FROM expense
  WHERE year=$3
  AND month=$2
  GROUP by user_id
  HAVING user_id=$1
 `;
  return db.query(queryStatement, [id, month,year])
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