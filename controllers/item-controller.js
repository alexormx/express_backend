const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');

//load forms schemas
const formSchemas = require('./form-schemas');

//Load models
const DBS = require('../models/index');

const get = async (req, res, next) => {
  const dbName =
    req.params.dbs.charAt(0).toUpperCase() +
    req.params.dbs.substring(1, req.params.dbs.length - 1);
  let items
  try{
    items = await DBS[dbName].find({});
  } catch (err) {
    const error = new HttpError(
        'Something went wrong, could not find ' + req.params.db,
        500
      );
      return next(error);
  }
  res.json({
    [req.params.dbs]: items.map((item) => item.toObject({ getters: true })),
  });
};

const getById = async (req, res, next) => {
  const dbName =
    req.params.dbs.charAt(0).toUpperCase() +
    req.params.dbs.substring(1, req.params.dbs.length - 1);
  const itemId = req.params.id;
  let item;
  try {
    item = await DBS[dbName].findById(itemId);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not find a ' + dbName,
      500
    );
    return next(error);
  }

  if (!item) {
    const error = new HttpError(
      'Could not find a ' + dbName + ' for the provided id',
      404
    );
    return next(error);
  }
  res.json({ [req.params.dbs]: item.toObject({ getters: true }) });
};

const deleteById = async (req, res, next) => {
    const dbName =
    req.params.dbs.charAt(0).toUpperCase() +
    req.params.dbs.substring(1, req.params.dbs.length - 1);
    const itemId = req.params.id;
    let item;
    try {
      item = await DBS[dbName].findById(itemId);
    } catch (err) {
      const error = new HttpError(
        'Something went wrong, ' + dbName + ' was not deleted',
        500
      );
      return next(error);
    }
    try {
      item.remove();
    } catch (err) {
      const error = new HttpError(
        'Something went wrong, ' + dbName + ' was not deleted',
        500
      );
      return next(error);
    }
    res.status(200).json({ message: 'Deleted ' + dbName });
  };

exports.get = get;
exports.getById = getById;
exports.deleteById = deleteById;