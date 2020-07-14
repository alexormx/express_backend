const { validationResult } = require('express-validator');

const Order = require('../models/order');
const HttpError = require('../models/http-error');

const createOrder = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid input data, please check your data', 422)
    );
  }
  const { invoice, user, date, method } = req.body;
  const createdOrder = new Order({
    invoice,
    user,
    date,
    method,
  });
  try {
    await createdOrder.save();
  } catch (err) {
    const error = new HttpError('Adding order failed, please try again', 500);
    return next(error);
  }

  res.status(201).json({ order: createdOrder.toObject({ getters: true }) });
};

const updateOrder = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(
        new HttpError('Invalid input data, please check your data', 422)
      );
    }
  
    const { invoice, user, date, method  } = req.body;
    const orderId = req.params.id;
    let order;
    try {
      order = await Order.findById(orderId);
    } catch (err) {
      const error = new HttpError(
        'Something went wrong, could not update order',
        500
      );
      return next(error);
    }
  
    order.invoice = invoice;
    order.user = user;
    order.date = date;
    order.method = method;
  
    try {
      await order.save();
    } catch (err) {
      const error = new HttpError(
        'Someting went wrong could not update order',
        500
      );
      return next(error);
    }
    res.status(200).json({ order: order.toObject({ getters: true }) });
  };

exports.createOrder = createOrder;
exports.updateOrder = updateOrder;
