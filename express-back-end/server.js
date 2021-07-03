const Express = require('express');
const balance = require('./routes/balance');
const transactions = require('./routes/transactions');
const dashboard = require('./routes/dashboard');
const categories = require('./routes/categories');
const budget = require('./routes/budget');
const user = require('./routes/user');

const App = Express();
App.use('/balance', balance);
App.use('/transactions', transactions);
App.use('/dashboard', dashboard);
App.use('/categories', categories);
App.use('/budget', budget);
App.use('/user', user);


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
