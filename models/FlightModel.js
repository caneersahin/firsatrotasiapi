const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
    userEmail: String,
    userPhone: String,
    departureCity: String,
    arrivalCity: String,
    lastCheckedPrice: Number,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Flight', flightSchema);
