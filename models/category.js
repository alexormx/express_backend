const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const categorySchema = new Schema({
  subcategory: { type: String, required: true },
  category: { type: String, required: true },
  group: { type: String, required: true },
  products: [{
    type: mongoose.Types.ObjectId, required: true, ref: 'Product'
  }]
});

module.exports = mongoose.model('Category', categorySchema);
