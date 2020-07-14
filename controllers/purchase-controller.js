const { v4: uuidv4 } = require('uuid');
const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');
const Purchase = require('../models/purchase');


const createPurchase = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid input data, please check your data', 422)
    );
  }
  const { invoice, provider, date } = req.body;
  const createdPurchase = new Purchase({
    invoice,
    provider,
    date
  });
  try {
    await createdPurchase.save();
  } catch (err) {
    const error = new HttpError('Adding purchase failed, please try again', 500);
    return next(error);
  }

  res.status(201).json({ purchase: createdPurchase.toObject({ getters: true }) });
};

const updatePurchase = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid input data, please check your data', 422)
    );
  }

  const { invoice, provider, date} = req.body;
  const purchaseId = req.params.id;
  let purchase;
  try {
    purchase = await Purchase.findById(purchaseId);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update purchase',
      500
    );
    return next(error);
  }

  purchase.invoice = invoice;
  purchase.provider = provider;
  purchase.date = date;

  try {
    await purchase.save();
  } catch (err) {
    const error = new HttpError(
      'Someting went wrong could not update product',
      500
    );
    return next(error);
  }
  res.status(200).json({ purchase: purchase.toObject({ getters: true }) });
};

exports.createPurchase = createPurchase;
exports.updatePurchase = updatePurchase;
