const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const saleSchema = new Schema({
    order: {type: mongoose.Types.ObjectId, required: true, ref: 'Order' },
    quantity: { type: Number, required: true },
    productcode: { type: mongoose.Types.ObjectId, required: true, ref: 'Product' },
    cost: { type: Number, require: true },
})

module.exports = mongoose.model('Sale', saleSchema);