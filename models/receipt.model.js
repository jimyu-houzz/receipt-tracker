const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// keep date type as String for simplicity
const receiptSchema = new Schema({
    receiptId: { type: String, required: true },
    tag: { type: String },
    date: { type: String },
    total: { type: Number, required: true },
    username: { type: String, required: true },
}, {
    timestamp: true,
});

const Receipt = mongoose.model('Receipt', receiptSchema);

module.exports = Receipt;