const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const purchaseSchema = new Schema({
  invoice: { type: String, required: true },
  provider: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
  date: { type: Date, required: true },
  payment: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Payment' }],
  shipping: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Shipping'}],
  products: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Purchaseitem' }],
  totalcost: { type: String, default: 0 },
  totalpayment: { type: String, default: 0 },
  status: { type: String, default: 'Pedido' },
  complains: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Complain' }],
});

module.exports = mongoose.model('Purchase', purchaseSchema);
