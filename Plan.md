# 1. Project Description
​
## Project title: 

* Budget Notebook

## Project description:

* A financial planning app for individual users to make budget and saving goal, record transactionsa, check budget status and monthly balance.

## Target audience:

* Everyone who wants to make financial plans.

# Team Members: 

* Suki, Dylan, Feng

# 2. User Stories:
1 Users can create, browse, edit and delete income categories and expenses categories
  -- can not not delete a category, if it already has transactions

2 Users can create, browse, edit and delete income budgets and expense budgets by month
  -- can set fixed budgets(like salary, rent, childcare fee, cable fee). These will be added to next month automatically.
  -- can cancel fixed budget, so it won't be added to next month
  -- can set non-fixed budgets
  -- can browse budget status(piechart, classified by categories). Each budget can link to its transactions.
  -- get notified when getting too close to buget limit
  -- can not delete a budget, if it already has transactions

3 Users can create, browse, edit and delete saving goals by month
  -- after creating budgets, users can see how much balance left
  -- can set saving goal (recieve a confirmation, if they set saving goal more than the remaining balance)
  -- can check saving goal status (loading bar)
  -- can check monthly balance 

4 Users can create, browse, edit and delete income and expenses transactions 
  -- should input category, budget and date
  -- can search transactions, filter transactions by category and month
  -- can count transactions by category (piechart)
  -- can check income and expense trend by category(statistic graph)

5 Users can signup, login, logout



<!-- ### routine of setting up buget(by month):
1. predict total income ($5000)
2. predict total expenses ($3000)
   fixed expense + non-fixed expenses(predictable, flex budget)
3. subtract expenses from income to find remaining balance(Users can see the remianing balance dynamicly)
    --($2000)
4. set the saving goal (below $2000) -->

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
income route:

expense route:
​
## Schedule:
​
