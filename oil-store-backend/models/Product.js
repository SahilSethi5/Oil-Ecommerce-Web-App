// models/Product.js
const mongoose = require('mongoose');

const specificationsSchema = new mongoose.Schema({
  origin: String,
  purity: String,
  type: String,
  extraction: String,
  benefits: [String]
}, { _id: false });

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  volume: {
    type: String,
    required: true
  },
  inStock: {
    type: Boolean,
    default: true
  },
  featured: {
    type: Boolean,
    default: false
  },
  specifications: specificationsSchema
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', productSchema);