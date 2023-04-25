const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: String,
  price: Number,
  quantity: Number,
  description: String
}, { collection: 'item_data' });


const result = mongoose.model('item_data', productSchema, 'item_data');

module.exports = result;