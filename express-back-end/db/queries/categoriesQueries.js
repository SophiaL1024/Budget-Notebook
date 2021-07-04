const db = require('../connection');

//selects all columns from income_categories table
const getIncomeCategoryById = (id) => {
  const queryStatement = `
  SELECT *
  FROM income_categories
  WHERE id = $1
  `;
  return db.query(queryStatement, [id])
    .then((response) => {
      return response.rows;
    })
    .catch(err => console.log(err));
};

//selects all columns from expense_categories table
const getExpenseCategoryById = (id) => {
  const queryStatement = `
  SELECT *
  FROM expense_categories
  WHERE id = $1
  `;
  return db.query(queryStatement, [id])
    .then((response) => {
      return response.rows;
    })
    .catch(err => console.log(err));
};

module.exports = {
  getExpenseCategoryById,
  getIncomeCategoryById
};