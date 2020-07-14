const express = require('express');
const { check } = require('express-validator');

const purchaseController = require('../controllers/purchase-controller');
const checkAuth = require('../middleware/check-auth');
const router = express.Router();

router.use(checkAuth);

router.post(
  '/',
  [
    check('invoice').not().isEmpty(),
    check('provider').not().isEmpty(),
    check('date').not().isEmpty()
  ],
  purchaseController.createPurchase
);

router.patch(
  '/:id',
  [
    check('invoice').not().isEmpty(),
    check('provider').not().isEmpty(),
    check('date').not().isEmpty()
  ],
  purchaseController.updatePurchase
);

module.exports = router;
