const { v4: uuidv4 } = require('uuid');
const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');
const Category = require('../models/category');


const getCategory = async (req, res, next) => {
  // const dbName =
  //   req.params.dbs.charAt(0).toUpperCase() +
  //   req.params.dbs.substring(1, req.params.dbs.length - 1);
  let categories
  try{
    categories = await Category.find({})
  } catch (err) {
    const error = new HttpError(
        'Something went wrong, could not find categories',
        500
      );
      return next(error);
  }
  res.json({
    categories: categories.map((category) => category.toObject({ getters: true })),
  });
};

const createCategory = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid input data, please check your data', 422)
    );
  }
  const { subcategory, category, group } = req.body;
  const createdCategory = new Category({
    subcategory,
    category,
    group
  });
  try {
    await createdCategory.save();
  } catch (err) {
    const error = new HttpError('Adding category failed, please try again', 500);
    return next(error);
  }

  res.status(201).json({ category: createdCategory.toObject({ getters: true }) });
};

const updateCategory = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid input data, please check your data', 422)
    );
  }

  const { subcategory, category, group } = req.body;
  const categoryId = req.params.id;
  let categories;
  try {
    categories = await Category.findById(categoryId);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update category',
      500
    );
    return next(error);
  }

  categories.subcategory = subcategory;
  categories.category = category;
  categories.group = group;

  try {
    await categories.save();
  } catch (err) {
    const error = new HttpError(
      'Someting went wrong could not update product',
      500
    );
    return next(error);
  }
  res.status(200).json({ category: categories.toObject({ getters: true }) });
};

exports.getCategory = getCategory;
exports.createCategory = createCategory;
exports.updateCategory = updateCategory;
