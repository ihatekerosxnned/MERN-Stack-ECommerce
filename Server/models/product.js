const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  product_name: {
    type: String,
    required: true
  },
  product_code: {
    type: String,
    required: true
  },
  product_category: {
    type: String,
    required: true
  },
  product_description: {
    type: String,
    required: true
  },
  product_price: {
    type: String,
    required: true
  },
  sku: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Product', productSchema);
