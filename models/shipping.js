const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const shippingSchema = new Schema({
    order: {type: mongoose.Types.ObjectId, required: true, ref: 'Order' },
    date: { type: Date, required: true },
    method: { type: String, required: true },
    tracking: { type: String, required: true },
    cost: { type: Number, require: true },
    status:{type: String, required: true}, 
    comments:{type: String, required: true}
})

module.exports = mongoose.model('Shipping', shippingSchema);