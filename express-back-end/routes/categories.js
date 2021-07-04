const Express = require('express');
const router = Express.Router();
const categoryQueries = require('../db/queries/categoriesQueries');
router.get('/:id', (req, res) => {
  const categoryData = {};
  categoryQueries.getIncomeCategoryById(req.params.id)
    .then((resolve) => {
      categoryData.incomeCategories = resolve;
    })
    .then(() => {
      categoryQueries.getExpenseCategoryById(req.params.id)
        .then((resolve) => {
          categoryData.expenseCategories = resolve;
          res.json(categoryData);
        });
    });
});

router.post('/', (req, res) => {

});

router.patch('/', (req, res) => {

});

router.delete('/', (req, res) => {

});

module.exports = router;