const db = require('../connection');

const getIncomeTransactionsByDescription = (id) => {
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

const getExpenseTransactionsByDescription = (id) => {
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
  getIncomeTransactionsByDescription,
  getExpenseTransactionsByDescription
};