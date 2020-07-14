const { v4: uuidv4 } = require('uuid');
const { validationResult } = require('express-validator');
const mongoose = require('mongoose');

const HttpError = require('../models/http-error');
const Product = require('../models/product');
const Category = require('../models/category');

const getProducts = async (req, res, next) => {
  const page = req.query.page- 1;
  const perPage = parseInt(req.query.perpage);
  const skipAmount = page * perPage
  let products;
  try {
    products = await Product.find({})
      .populate('category')
      .limit(perPage)
      .skip(skipAmount)
      .sort('name');
    totalProducts = await Product.countDocuments({});
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not find ' + req.params.db,
      500
    );
    return next(error);
  }
  res.json({
    products: products.map((item) => item.toObject({ getters: true })),
    totalProducts,
  });
};

const createProduct = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid input data, please check your data', 422)
    );
  }
  const { code, name, price, brand, category, sku } = req.body;
  const createdProduct = new Product({
    code,
    name,
    sku,
    category,
    price,
    brand
  });

  let categoryCheck;
  try {
    categoryCheck = await Category.findById(category);
  } catch (err) {
    const error = new HttpError(
      'Creating product failed, please try again',
      500
    );
    console.log(code);
    return next(error);
  }

  if (!categoryCheck) {
    const error = new HttpError('Could not find category for provided id', 404);
    console.log(code);
    return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdProduct.save({ session: sess });
    categoryCheck.products.push(createdProduct);
    await categoryCheck.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError('Adding product failed, please try again', 500);
    console.log(categoryCheck);
    return next(error);
  }

  res.status(201).json({ product: createdProduct.toObject({ getters: true }) });
};

const updateProduct = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid input data, please check your data', 422)
    );
  }

  const { code, name, price, brand, category, sku } = req.body;
  const productId = req.params.id;
  let product;
  try {
    product = await Product.findById(productId);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update product',
      500
    );
    return next(error);
  }

  product.code = code;
  product.sku = sku;
  product.name = name;
  product.category = category;
  product.price = price;
  product.brand = brand;

  try {
    await product.save();
  } catch (err) {
    const error = new HttpError(
      'Someting went wrong could not update product',
      500
    );
    return next(error);
  }
  res.status(200).json({ product: product.toObject({ getters: true }) });
};

const deleteProduct = async (req, res, next) => {
  const productId = req.params.id;

  let product;
  try {
    product = await Product.findById(productId).populate('category');
  } catch (err) {
    const error = new HttpError(
      'Someting went wrong, could not remove or delete the product',
      500
    );
    return next(error);
  }

  if (!product) {
    const error = new HttpError('Could not find product for this id', 404);
    return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await product.remove({ session: sess });
    product.category.products.pull(product);
    await product.category.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could no delete product',
      500
    );
    return next(error);
  }
  res.status(200).json({ message: 'Deleted product' });
};

exports.createProduct = createProduct;
exports.updateProduct = updateProduct;
exports.getProducts = getProducts;
exports.deleteProduct = deleteProduct;
