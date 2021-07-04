const db = require('../connection');

//selects all columns from income table
const getIncomeTransactionsById = (id) => {
  const queryStatement = `
  SELECT *
  FROM income
  GROUP by id
  HAVING user_id=$1
  `;
  return db.query(queryStatement, [id])
    .then((response) => {
      return response.rows;
    })
    .catch(err => console.log(err));
};

//selects all columns from expense table
const getExpenseTransactionsById = (id) => {
  const queryStatement = `
  SELECT *
  FROM expense
  GROUP by id
  HAVING user_id=$1
  `;
  return db.query(queryStatement, [id])
    .then((response) => {
      return response.rows;
    })
    .catch(err => console.log(err));
};

module.exports = {
  getIncomeTransactionsById,
  getExpenseTransactionsById
};