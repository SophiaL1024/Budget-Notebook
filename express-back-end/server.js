const Express = require('express');
const balances = require('./routes/balances');
const transactions = require('./routes/transactions');
const dashboards = require('./routes/dashboards');
const categories = require('./routes/categories');
const budgets = require('./routes/budgets');
const users = require('./routes/users');

const App = Express();
App.use('/balances', balances);
App.use('/transactions', transactions);
App.use('/dashBoards', dashboards);
App.use('/categories', categories);
App.use('/budgets', budgets);
App.use('/users', users);


const BodyParser = require('body-parser');
const PORT = 8080;

// Express Configuration
App.use(BodyParser.urlencoded({ extended: false }));
App.use(BodyParser.json());
App.use(Express.static('public'));

//Set up db connection
const db = require('./db/connection');
db.connect();


// Sample GET route
App.get('/api/data', (req, res) => res.json({
  message: "Seems to work!",
}));

App.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Express seems to be listening on port ${PORT} so that's pretty good 👍`);
});
