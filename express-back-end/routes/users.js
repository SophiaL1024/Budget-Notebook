const Express = require('express');
const router = Express.Router();
const userQueries = require('../db/queries/userQueries');

router.get('/', (req, res) => {

});
router.post('/', (req, res) => {
  const {email,password} = req.body.data;
  userQueries.getUserInfo(email)
    .then((resolve)=>{
      if (resolve && resolve.password === password) {
        res.cookie("userId",resolve.id);
        res.json(resolve);
      }
      res.json();
    });
});
module.exports = router;