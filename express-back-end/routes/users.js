const Express = require('express');
const router = Express.Router();
const userQuries = require('../db/queries/userQuries');

router.get('/', (req, res) => {

});
router.post('/', (req, res) => {
  const {email,password} = req.body.data;
  userQuries.getUserInfo(email)
    .then((resolve)=>{
      if (resolve && resolve.password === password) {
        res.cookie("userId",resolve.id);
        res.json(resolve);
      }
      res.json();
    });
});
module.exports = router;