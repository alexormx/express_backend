const express = require('express');

const itemController = require('../controllers/item-controller');
const checkAuth = require('../middleware/check-auth');
const router = express.Router();

//router.use(checkAuth);

router.get('/:dbs', itemController.get);

router.get('/:dbs/:id', itemController.getById);

router.delete('/:dbs/:id', itemController.deleteById);

module.exports = router;