require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const HttpError = require('./models/http-error');

const main = require('./routes/main-routes')
const products = require('./routes/products-routes');
const users = require('./routes/users-routes');
const orders = require('./routes/orders-routes');
const purchases = require('./routes/purchases-routes');
const categories = require('./routes/categories-routes');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Request-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  next();
});

app.use('/api/get', main)
app.use('/api/products', products);
app.use('/api/users', users);
app.use('/api/orders', orders);
app.use('/api/purchases', purchases);
app.use('/api/categories', categories);

app.use((req, res, next) => {
  const error = new HttpError('Could not find this route.', 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || 'An unknown error occurred' });
});

mongoose
  .connect(
    process.env.MONGO_URL,
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
  )
  .then(() => {
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });
