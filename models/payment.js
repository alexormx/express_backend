const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const paymentSchema = new Schema({
    order: { type: mongoose.Types.ObjectId, ref: 'Order' },
    purchase: { type: mongoose.Types.ObjectId, ref: 'Order' },
    expenses: { type: mongoose.Types.ObjectId, ref: 'Expense' },
    source: {type: String, required: true},
    transaction: {type:String, required: true},
    currency: {type: String, required: true},
    exchange: {type: Number, required: true},
    date: { type: Date, required: true },
    account: { type: String, required: true },
    quantity: { type: String, required: true },
})

module.exports = mongoose.model('Payment', paymentSchema);