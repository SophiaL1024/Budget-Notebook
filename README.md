## Budget Notebook

* Budget Notebook is a personal financial planning application.

* Users can set up budgets and saving goal by month, browse budget status and saving goal achievement. Users can edit and delete budgets.

* Users can browse, record, edit, delete transactions.

* Users can browse balance amount by month and year. 


## Screenshots

* Dashboard Page
!["screenshot of the dashboard"](https://raw.githubusercontent.com/SophiaL1024/Budget-Notebook/main/react-front-end/public/img/DashboardScreenshot.png)

* Budget Page
!["screenshot of the budget page"](https://raw.githubusercontent.com/SophiaL1024/Budget-Notebook/main/react-front-end/public/img/BudgetPage.png)

!["screenshot of the budget page"](https://raw.githubusercontent.com/SophiaL1024/Budget-Notebook/main/react-front-end/public/img/Expense_Budget.png)

!["screenshot of the budget page"](https://raw.githubusercontent.com/SophiaL1024/Budget-Notebook/main/react-front-end/public/img/Saving_goal.png)

* Transaction Page
!["screenshot of the transaction page"](https://raw.githubusercontent.com/SophiaL1024/Budget-Notebook/main/react-front-end/public/img/TransactionPage.png)

!["screenshot of the transaction page"](https://raw.githubusercontent.com/SophiaL1024/Budget-Notebook/main/react-front-end/public/img/addTransaction.png)

## Dependencies 

#### Front-end
* React 
* React-dom
* React-router
* React-router-dom
* React-scripts
* Recharts
* Axios
* Chakra UI
* Material UI
* Recharts
* Emotion/react
* Emotion/styled
* framer-motion

#### Back-end
* Node JS
* Express
* PostgreSQL
* pg-native
* dotenv
* nodemon
* chalk

## Set up

1. Clone this repository.

2. In express-back-end directory, install dependencies using the command `npm install`.

3. In react-front-end directory, install dependencies using the command `npm install`.

4. Create .env file based on .env.example in express-back-end folder.

5. In express-back-end directory, Run `npm run db:reset` to reset the database.

6. You need two terminal windows/tabs. In one terminal, `cd` into `express-back-end`, then run `npm start` or `yarn start` to launch the server. In the other terminal, `cd` into `react-front-end`. Then run `npm start` or `yarn start`, and go to `localhost:3000` in your browser.

7. Log in using the email: test@test.com and password: 123.

Enjoy!

## Collaboration:

* [Feng Liu](https://github.com/SophiaL1024): Front-end and back-end functions of budget route, dashboard route and user route. Search Function, parts of edit and add new function of transaction route.

* [Dylan McGrann](https://github.com/DylanMcGrann-dev): Front-end and back-end functions of transaction route.

* [Suki Chan](https://github.com/sukick): Charts,UI and data seeds.
