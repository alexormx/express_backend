const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const complainSchema = new Schema({
    reason: { type: String, requiere: true },
    date: { type: Date, requiere: true },
    measure: { type: String, requiere: true },
    cost: {type: mongoose.Types.ObjectId, requiere: true, ref: 'Expense'}
});

module.exports = mongoose.model('Complain', complainSchema);
