const cookieParser = require('cookie-parser');
const Express = require('express');
const pool = require('../db/connection');
const router = Express.Router();
console.log("Running routes");

router.get('/', (req, res) => {
  // const templateVars = {
  //   user: null,
  // };
  // res.render('login', templateVars);
  console.log("hello")
  res.sendStatus(200)
});

// router.post('/', (req, res) => {
//   res.redirect('/dashboards/1')
//   const user = users[req.email];
//   if (user) {
//     console.log("this is redirecting when login ")
//     window.location.href='/dashboards';
//   }
//   console.log("this is user route");
//   res.sendStatus(200);
//   if (! req.user_id) {
//     res.redirect('/dashboards/1')
//   }
  //if email matches the record, if the result return a user that exists, 
  // then see if pw matches, if pw not match, 
  // then look up the database, select everything from user 
  // redirect to dashboard
// })



// const users = {
//   "alice": {
//     email: "alice@gmail.com",
//     password: "123"
//   }
// };

// // GET /login
// router.get('/:id', (req, res) => {
//   const templateVars = {
//     userId: 0,
//     userName: 'New User'
//   }
//   res.render("index", templateVars)
// });

// // GET /login/:id
// router.get('/:id', (req, res) => {
//   res.cookie("user_id", req.params.user_id);
//   res.redirect('/dashboards')
// });


module.exports = router;