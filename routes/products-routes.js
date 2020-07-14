const express = require('express');
const { check } = require('express-validator');

const productController = require('../controllers/products-controller');
const checkAuth = require('../middleware/check-auth');
const router = express.Router();

router.use(checkAuth);

router.get(
  '/',
  productController.getProducts
);

router.post(
  '/',
  [
    check('code').isLength({ min: 7 }),
    check('name').not().isEmpty(),
    check('brand').not().isEmpty(),
    check('price').not().isEmpty(),
  ],
  productController.createProduct
);

router.patch(
  '/:id',
  [
    check('code').isLength({ min: 7 }),
    check('name').not().isEmpty(),
    check('brand').not().isEmpty(),
    check('price').not().isEmpty(),
  ],
  productController.updateProduct
);

router.delete(
  '/:id',
  productController.deleteProduct
);

module.exports = router;
