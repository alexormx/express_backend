const express = require('express');
const { check } = require('express-validator');

const product = ['code', 'name', 'price', 'brand'];

const products = [
  check('order').not().isEmpty(),
  check('user').not().isEmpty(),
  check('date').not().isEmpty(),
  check('method').not().isEmpty(),
];

exports.product = product;
