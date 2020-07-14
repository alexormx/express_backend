const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true },
  role: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Role' }], 
  password: { type: String, required: true, minlength: 6 },
  orders: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Order' }],
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
