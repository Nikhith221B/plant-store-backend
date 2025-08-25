const mongoose = require('mongoose');

const plantSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    categories: [String],
    inStock: { type: Boolean, default: true },
    image: { type: String }
});

module.exports = mongoose.model('Plant', plantSchema);
