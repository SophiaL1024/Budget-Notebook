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

const balance = require('./routes/balance');
const transactions = require('./routes/transactions');
const dashboard = require('./routes/dashboard');
const categories = require('./routes/categories');
const budget = require('./routes/budget');
const user = require('./routes/user');

// Sample GET route
App.get('/api/data', (req, res) => res.json({
  message: "Seems to work!",
}));
App.use('/balance', balance);
App.use('/transactions', transactions);
App.use('/dashboard', dashboard);
App.use('/categories', categories);
App.use('/budget', budget);
App.use('/user', user);

App.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Express seems to be listening on port ${PORT} so that's pretty good 👍`);
});
