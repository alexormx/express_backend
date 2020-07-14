const express = require('express');
const { check } = require('express-validator');

const categoriesController = require('../controllers/categories-controller');
const checkAuth = require('../middleware/check-auth');
const router = express.Router();

router.use(checkAuth);

router.get('/', categoriesController.getCategory);

router.post(
  '/',
  [
    check('subcategory').not().isEmpty(),
    check('category').not().isEmpty(),
    check('group').not().isEmpty(),
  ],
  categoriesController.createCategory
);

router.patch(
  '/:id',
  [
    check('subcategory').not().isEmpty(),
    check('category').not().isEmpty(),
    check('group').not().isEmpty(),
  ],
  categoriesController.updateCategory
);

module.exports = router;
