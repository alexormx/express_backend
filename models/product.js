const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
  code: { type: String, required: true },
  name: { type: String, required: true },
  sku: {type: Number, required: true },
  brand: { type: String, required: true },
  category: { type: mongoose.Types.ObjectId, required: true, ref: 'Category' },
  images: [{ type: String }],
  inventory: { type: Number, default: 0 },
  intransit: { type: Number, default: 0 },
  purchased: { type: Number, default: 0 },
  saled: { type: Number, default: 0 },
  price: { type: String, required: true },
  suppliers: [{ type: mongoose.Types.ObjectId, required: true, ref: 'User' }],
  saleoption: [
    { type: mongoose.Types.ObjectId, required: true, ref: 'Option' },
  ],
  saleorders: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Sale' }],
  purchorders: [
    { type: mongoose.Types.ObjectId, required: true, ref: 'Purchaseitem' },
  ],
  prevId: { type: Number},
});

module.exports = mongoose.model('Product', productSchema);
