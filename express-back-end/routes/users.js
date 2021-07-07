//const cookieParser = require('cookie-parser');
const Express = require('express');
const pool = require('../db/connection');
const router = Express.Router();
console.log("Running routes");

router.get('/', (req, res) => {
  console.log("hello")
  res.sendStatus(200)
});

module.exports = router;