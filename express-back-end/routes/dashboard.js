const Express = require('express');
const router = Express.Router();
const dashBoardQuries = require('../db/queries/dashboardQuries');


router.get('/dashboard', (req, res) => res.json({
  
}));

module.exports = router;
