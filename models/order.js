const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  invoice: { type: String, required: true },
  user: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
  date: { type: Date, required: true },
  method: { type: String, required: true },
  payment: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Payment' }],
  shipping: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Shipping'}],
  saleitems: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Sale' }],
  totalcost: { type: String, default: 0 },
  totalpayment: { type: Number, default: 0 },
  status: { type: String, default: 'Apartado' },
  complains: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Complain' }],
});

module.exports = mongoose.model('Order', orderSchema);
