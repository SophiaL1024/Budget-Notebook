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

const deleteIncomeTransactionById = (id) => {
  const queryStatement = `
  DELETE FROM income
  WHERE id = $1`;
  db.query(queryStatement, [id]);
};

const deleteExpenseTransactionById = (id) => {
  const queryStatement = `
  DELETE FROM expense
  WHERE id = $1`;
  db.query(queryStatement, [id]);
};

const addExpense = (name, description, amount, year, month, day, userId) => {
  const queryStatement = `
  INSERT INTO expense (name,description,amount,year,month,day,user_id)
  VALUES ($1,$2,$3,$4,$5,$6,$7)`;
  db.query(queryStatement,[name, description, amount, year, month, day, userId])
    .catch(err => console.log(err));
};

const addIncome = (name, description, amount, year, month, day, userId) => {
  const queryStatement = `
  INSERT INTO income (name,description,amount,year,month,day,user_id)
  VALUES ($1,$2,$3,$4,$5,$6,$7)`;
  db.query(queryStatement,[name, description, amount, year, month, day, userId])
    .catch(err => console.log(err));
};

module.exports = {
  addIncome,
  addExpense,
  deleteIncomeTransactionById,
  deleteExpenseTransactionById,
  getIncomeTransactionsById,
  getExpenseTransactionsById
};