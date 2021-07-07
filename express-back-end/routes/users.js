<<<<<<< HEAD
// const cookieParser = require('cookie-parser');
=======
//const cookieParser = require('cookie-parser');
>>>>>>> 8fa5fdfbf64fc084db36164672be3209592aeb82
const Express = require('express');
const pool = require('../db/connection');
const router = Express.Router();
console.log("Running routes");

router.get('/', (req, res) => {
  console.log("hello");
  res.sendStatus(200);
});

module.exports = router;