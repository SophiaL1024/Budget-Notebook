const db = require('../connection');

const getIncomeAndBudget = (id, month, year) => {

  const queryStatement = `SELECT 
  SUM(income.amount) AS income_sum, income_budgets.*
  FROM income
  LEFT OUTER JOIN income_budgets ON income.income_budgets_id=income_budgets.id 
  WHERE income.month=$2 AND income.user_id=$1 AND income.year=$3
  GROUP BY income_budgets.id
 `;
  return db.query(queryStatement, [id, month, year])
    .then((response) => {
      return response.rows;
    })
    .catch(err => console.log(err));
};

const getExpenseAndBudget = (id, month, year) => {
  const queryStatement = `SELECT 
  sum(expense.amount) AS expense_sum, expense_budgets.*
  FROM expense
  LEFT OUTER JOIN expense_budgets ON expense.expense_budgets_id=expense_budgets.id 
  WHERE expense.month=$2 AND expense.user_id=$1 AND expense.year=$3
  GROUP BY expense_budgets.id
 `;
  return db.query(queryStatement, [id, month, year])
    .then((response) => {
      return response.rows;
    })
    .catch(err => console.log(err));
};

const createIncomeBudget = (name, amount, year, month, id) => {
  const queryStatement = `
  INSERT INTO income_budgets (name,amount,year,month,user_id)
  VALUES ($1,$2,$3,$4,$5)
  RETURNING id
 `;
  return db.query(queryStatement, [name, amount, year, month, id])
    .then((response) => {
      return response.rows[0].id;
    })
    .catch(err => console.log(err));
};

const createExpenseBudget = (name, amount, year, month, id) => {
  const queryStatement = `
  INSERT INTO expense_budgets (name,amount,year,month,user_id)
  VALUES ($1,$2,$3,$4,$5)
  RETURNING id; 
 `;
  return db.query(queryStatement, [name, amount, year, month, id])
    .then((response) => {
      // console.log(response.rows[0].id);
      return response.rows[0].id;
    })
    .catch(err => console.log(err));
};

const createExpense = (year,month,userId,resolve)=>{
  const queryStatement = `
  INSERT INTO expense (name,description,amount,year,month,day,user_id,expense_categories_id,expense_budgets_id)
  VALUES 
   (' ',' ',0,$1,$2,1,$3,1,$4)
 `;
  console.log(year,month,userId,resolve);
  db.query(queryStatement, [year,month,userId,resolve]);

};

const deleteIncomeBudget = (id) => {
  const queryStatement = `
  DELETE FROM income_budgets
  WHERE id=$1 
 `;
  db.query(queryStatement, [id]);
};

const deleteExpenseBudget = (id) => {
  const queryStatement = `
  DELETE FROM expense_budgets
  WHERE id=$1
 `;
  db.query(queryStatement, [id]);
};


module.exports = {
  getIncomeAndBudget,
  getExpenseAndBudget,
  createIncomeBudget,
  createExpenseBudget,
  deleteExpenseBudget,
  deleteIncomeBudget,
  createExpense,
  // createIncome
};