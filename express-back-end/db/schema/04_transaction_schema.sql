DROP TABLE IF EXISTS income CASCADE;
DROP TABLE IF EXISTS expense CASCADE;

CREATE TABLE income (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  amount NUMERIC NOT NULL,
  year INTEGER NOT NULL,
  month INTEGER NOT NULL,
  day INTEGER NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  income_categories_id INTEGER REFERENCES income_categories(id),
  income_budgets_id INTEGER REFERENCES income_budgets(id) 
);

CREATE TABLE expense (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  amount NUMERIC NOT NULL,
  year INTEGER NOT NULL,
  month INTEGER NOT NULL,
  day INTEGER NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  expense_categories_id INTEGER REFERENCES expense_categories(id),
  expense_budgets_id INTEGER REFERENCES expense_budgets(id)
);