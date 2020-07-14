const express = require('express');
const { check } = require('express-validator');

const ordersController = require('../controllers/orders-controller');
const checkAuth = require('../middleware/check-auth');
const router = express.Router();

router.use(checkAuth);

router.post(
  '/',
  [
    check('order').not().isEmpty(),
    check('user').not().isEmpty(),
    check('date').not().isEmpty(),
    check('method').not().isEmpty(),
  ],
  ordersController.createOrder
);

router.patch(
  '/:id',
  [
    check('order').not().isEmpty(),
    check('user').not().isEmpty(),
    check('date').not().isEmpty(),
    check('method').not().isEmpty(),
  ],
  ordersController.updateOrder
);

module.exports = router;
