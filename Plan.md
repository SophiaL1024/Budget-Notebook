# 1. Project Description
​
## Project title: 

* Budget Notebook

## Project description:

* A financial planning app for individual users to make budget and saving goal, record transactions, check budget status and monthly balance.

## Target audience:

* Everyone who wants to make financial plans.

# Team Members: 

* Suki, Dylan, Feng

# 2. User Stories:
1 Users can create, browse, edit and delete income categories and expenses categories
  -- can view transactions by category (piechart)
  -- can not not delete a category, if it already has transactions

2 Users can create, browse, edit and delete income budgets and expense budgets by month
  -- can set fixed budgets(like salary, rent, childcare fee, cable fee). These will be added to next month automatically. //strech
  -- can cancel fixed budget, so it won't be added to next month //strech
  -- can set non-fixed budgets
  -- after creating budgets, users can see how much balance left
  -- can set saving goal (receive a confirmation, if they set saving goal more than the remaining balance)
  -- can browse budget status(piechart, classified by categories). Each budget can link to its transactions.
  -- get notified when getting too close to budget limit
  -- can not delete a budget, if it already has transactions

3 Users can create, browse, edit and delete saving goals by month
  -- can check saving goal status (bar chart)
  -- can check monthly balance 

4 Users can create, browse, edit and delete income and expenses transactions 
  -- can create new transactions, should input category, budget and date
  -- can search transactions, filter transactions by category and month
  -- can check income and expense trend by category(statistic graph)

5 Users can register, login, logout



# 3. Wireframes

# 4. ERD

## Nouns:
Users, income types , expenses types, income budget, expense budget, saving goal, income transaction, expense transaction


# 5. Stack Choices
-- Front-End: React, React Router, SASS, Material UI, some chart UI libraries
-- Back-End: Node, Express
-- Database: PSQL


​
## Roles:

mixture of horizontal and vertical approach

## Routes:
login route:

GET /sign up
POST /sign up
GET /login
POST /login

dashboard route:
GET /dashboard --- balance,budget

categories route: 
GET /categories/ --- view categories
POST /categories/ --- create categories
DELETE /categories/  --- Delete categories 


budget route: 
GET /budget -- view "pie chart" to see how much they have spent and on what
POST /budget -- create new budget and saving goal
PATCH /budget -- edit existing budgets
DELETE /budget -- delete existing budgets

balance route:
GET /saving --- view saving goal status(loading bar) and check monthly balance
PATCH /saving --- edit


transaction route:
GET /transaction --view(piechart by cagetory, trend chart by time), search, filter(by category and month)
POST /transaction --create new transactions
PATCH /transaction --edit
DELETE /transaction

## Schedule:

#### ​Friday: set up database and route
route ---Dylan
database ---Feng
seeds ---Suki

#### Saturday: route and queries
user route, categories route ---Suki
dashboard route, budget route ---Feng
balance route, transaction route ---Dylan
