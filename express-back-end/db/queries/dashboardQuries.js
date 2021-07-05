const db = require('../connection');

// const getAnnualIncomeByUserIdDate = (id,year) => {
//   const queryStatement = `SELECT
//   SUM(amount) as annual_income_sum
//   FROM income
//   WHERE year=$2
//   GROUP by user_id
//   HAVING user_id=$1
//  `;
//   return db.query(queryStatement, [id,year])
//     .then((response) => {
//       return response.rows[0].annual_income_sum;
//     })
//     .catch(err => console.log(err));
// };

// const getAnnualExpenseByUserIdDate = (id,year) => {
//   const queryStatement = `SELECT
//   SUM(amount) as annual_expense_sum
//   FROM expense
//   WHERE year=$2
//   GROUP by user_id
//   HAVING user_id=$1
//  `;
//   return db.query(queryStatement, [id,year])
//     .then((response) => {
//       return response.rows[0].annual_expense_sum;
//     })
//     .catch(err => console.log(err));
// };


// const getMonthlyIncomeByUserIdDate = (id, month,year) => {
//   const queryStatement = `SELECT
//   SUM(amount) as monthly_income_sum
//   FROM income
//   WHERE year=$3
//   AND month=$2
//   GROUP by user_id
//   HAVING user_id=$1
//  `;
//   return db.query(queryStatement, [id, month,year])
//     .then((response) => {
//       return response.rows[0].monthly_income_sum;
//     })
//     .catch(err => console.log(err));
// };

// const getMonthlyExpenseByUserIdDate = (id, month,year) => {
//   const queryStatement = `SELECT
//   SUM(amount) as monthly_expense_sum
//   FROM expense
//   WHERE year=$3
//   AND month=$2
//   GROUP by user_id
//   HAVING user_id=$1
//  `;
//   return db.query(queryStatement, [id, month,year])
//     .then((response) => {
//       return response.rows[0].monthly_expense_sum;
//     })
//     .catch(err => console.log(err));
// };

const getBalanceBudgetByUserIdYear = (id, year) => {
  const queryStatement = `
  SELECT amount
  FROM balance_budgets
  WHERE user_id=$1
  AND year=$2
  `;
  return db.query(queryStatement, [id, year])
    .then((response) => {
      const balanceBudget = response.rows.map(element => {
        return element = element.amount;
      });
      return balanceBudget;
    })
    .catch(err => console.log(err));
};

const getMonthlyIncomeByUserIdYear = (id, year) => {
  const queryStatement = `
  SELECT SUM(income.amount) AS monthly_income
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
  SELECT SUM(expense.amount) AS monthly_expense
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