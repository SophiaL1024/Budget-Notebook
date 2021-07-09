const db = require('../connection');

//selects all columns from income table
const getIncomeTransactionsById = (id,month,year) => {
  const queryStatement = `
  SELECT *
  FROM income
  WHERE month=$2 AND user_id=$1 AND year=$3
  `;
  return db.query(queryStatement, [id,month,year])
    .then((response) => {
      console.log(response.rows);
      return response.rows;
    })
    .catch(err => console.log(err));
};

//selects all columns from expense table
const getExpenseTransactionsById = (id,month,year) => {
  const queryStatement = `
  SELECT *
  FROM expense
  WHERE month=$2 AND user_id=$1 AND year=$3
  `;
  return db.query(queryStatement, [id,month,year])
    .then((response) => {
      return response.rows;
    })
    .catch(err => console.log(err));
};

const deleteIncomeTransactionById = (id) => {
  const queryStatement = `
  DELETE FROM income
  WHERE id = $1`;
  return db.query(queryStatement, [id])
    .then((response) => {
      return response.rows;
    })
    .catch(err => console.log(err));
};

const deleteExpenseTransactionById = (id) => {
  const queryStatement = `
  DELETE FROM expense
  WHERE id = $1`;
  return db.query(queryStatement, [id])
    .then((response) => {
      return response.rows;
    })
    .catch(err => console.log(err));
};

const addExpense = (name, description, amount, year, month, day, userId) => {
  const queryStatement = `
  INSERT INTO expense (name,description,amount,year,month,day,user_id)
  VALUES ($1,$2,$3,$4,$5,$6,$7)`;
  return db.query(queryStatement, [name, description, amount, year, month, day, userId])
    .then((response) => {
      return response.rows;
    })
    .catch(err => console.log(err));
};

const addIncome = (name, description, amount, year, month, day, userId) => {
  const queryStatement = `
  INSERT INTO income (name,description,amount,year,month,day,user_id)
  VALUES ($1,$2,$3,$4,$5,$6,$7)`;
  return db.query(queryStatement, [name, description,
    amount, year, month, day, userId])
    .then((response) => {
      return response.rows;
    })
    .catch(err => console.log(err));
};

const editIncomeTransactions = (name, description, amount, month, day, year, id) => {
  const queryStatement = `
  UPDATE income
  SET name = $1,
      description = $2,
      amount = $3,
      month = $4,
      day = $5,
      year = $6
  WHERE id = $7
  returning *
  `;
  return db.query(queryStatement, [name, description, amount, month, day, year, id])
    .then((response) => {
      return response.rows;
    })
    .catch(err => console.error(err));
};

const editExpenseTransactions = (name, description, amount, month, day, year, id) => {
  const queryStatement = `
  UPDATE income
  SET name = $1,
      description = $2,
      amount = $3,
      month = $4,
      day = $5,
      year = $6
  WHERE id = $7
  returning *
  `;
  return db.query(queryStatement, [name, description, amount, month, day, year, id])
    .then((response) => {
      return response.rows;
    })
    .catch(err => console.error(err));
};

module.exports = {
  editExpenseTransactions,
  editIncomeTransactions,
  addIncome,
  addExpense,
  deleteIncomeTransactionById,
  deleteExpenseTransactionById,
  getIncomeTransactionsById,
  getExpenseTransactionsById
};

