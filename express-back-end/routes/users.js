const Express = require('express');
const router = Express.Router();

router.get('/:id', function (req, res) {
  const user = getUser(req.params.user_Id)

  if (!user) return res.status(404).json({})
 
  return res.json(user)
 })

// router.post('/', (req, res) => res.json({
// }));

module.exports = router;