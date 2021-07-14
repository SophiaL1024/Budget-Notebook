const Express = require('express');
const db = require('./db/connection');
const BodyParser = require('body-parser');

const App = Express();
const PORT = 8080;

// Express Configuration
App.use(BodyParser.urlencoded({ extended: false }));
App.use(BodyParser.json());
// App.use(Express.static('public'));

//Set up db connection
db.connect();

// const balance = require('./routes/balances');
const transactions = require('./routes/transactions');
const dashboard = require('./routes/dashboards');
// const categories = require('./routes/categories');
const budget = require('./routes/budgets');
const user = require('./routes/users');

// Sample GET route
App.get('/api/data', (req, res) => res.json({
  message: "Seems to work!",
}));
// App.use('/balances', balance);
App.use('/transactions', transactions);
App.use('/dashboards', dashboard);
// App.use('/categories', categories);
App.use('/budgets', budget);
App.use('/', user);

App.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Express seems to be listening on port ${PORT} so that's pretty good 👍`);
});
