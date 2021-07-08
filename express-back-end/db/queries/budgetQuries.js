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

const getBalanceBudget = (id, month, year)=>{
  
  const queryStatement = `SELECT amount AS budget
  FROM balance_budgets
  WHERE month=$2 AND user_id=$1 AND year=$3
  UNION ALL
  SELECT SUM(amount) AS income_balance
  FROM income
  WHERE month=$2 AND user_id=$1 AND year=$3
  UNION ALL
  SELECT SUM(amount) AS expense_balance
  FROM expense
  WHERE month=$2 AND user_id=$1 AND year=$3
 `;
  return db.query(queryStatement, [id, month, year])
    .then((response) => {
      const balance = response.rows.map(e=>e.budget);
      // return and array of balance budget amount, sum of income and sum of expense for a given month
      console.log(balance);
      return balance;
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

const createBalanceBudget = (amount, year, month, id) => {
  const queryStatement = `
  INSERT INTO balance_budgets (amount,year,month,user_id)
  VALUES ($1,$2,$3,$4)   
 `;
  db.query(queryStatement, [amount, year, month, id]);
    
};

const createIncome = (year,month,userId,resolve)=>{
  const queryStatement = `
  INSERT INTO income (name,description,amount,year,month,day,user_id,income_categories_id,income_budgets_id)
  VALUES 
   (' ',' ',0,$1,$2,1,$3,1,$4)
 `;
  // console.log(year,month,userId,resolve);
  db.query(queryStatement, [year,month,userId,resolve]);

};

const createExpense = (year,month,userId,resolve)=>{
  const queryStatement = `
  INSERT INTO expense (name,description,amount,year,month,day,user_id,expense_categories_id,expense_budgets_id)
  VALUES 
   (' ',' ',0,$1,$2,1,$3,1,$4)
 `;
  // console.log(year,month,userId,resolve);
  db.query(queryStatement, [year,month,userId,resolve]);

};

const deleteIncomeBudget = (id) => {
  const queryStatement = `
  DELETE FROM income_budgets
  WHERE id=$1 
  RETURNING *
 `;
  db.query(queryStatement, [id]);
  // .then(()=>{

  //   return "delete";
  // });
};

const deleteExpenseBudget = (id) => {
  const queryStatement = `
  DELETE FROM expense_budgets
  WHERE id=$1
 `;
  db.query(queryStatement, [id]);
};

const updateExpenseBudget = (id,amount,name)=>{
  const queryStatement = `
  UPDATE expense_budgets
  SET amount = $2, name=$3        
  WHERE id=$1
  RETURNING *;
 `;
  return db.query(queryStatement, [id,amount,name])
    .then((response)=>{
      return response.rowCount;
    });

};

const updateIncomeBudget = (id,amount,name)=>{
  // console.log(id,amount,name);
  const queryStatement = `
  UPDATE income_budgets
  SET amount = $2, name=$3     
  WHERE id=$1
  RETURNING *;
 `;
  return db.query(queryStatement, [id,amount,name])
    .then((response)=>{
      return response.rowCount;
    });

};

const updateBalanceBudget = (month,year,amount,userId)=>{
  console.log(month,year,amount);
  const queryStatement = `
  UPDATE balance_budgets
  SET amount = $3     
  WHERE month=$1 AND year=$2 AND user_id=$4
  RETURNING *;
 `;
  return db.query(queryStatement, [month,year,amount,userId])
    .then((response)=>{
      // console.log(response);
      return response.rowCount;
    });

};


module.exports = {
  getIncomeAndBudget,
  getExpenseAndBudget,
  createIncomeBudget,
  createExpenseBudget,
  createBalanceBudget,
  deleteExpenseBudget,
  deleteIncomeBudget,
  createExpense,
  createIncome,
  updateExpenseBudget,
  updateIncomeBudget,
  getBalanceBudget,
  updateBalanceBudget
};