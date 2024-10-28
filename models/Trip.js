// models/Trip.js
const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Kullanıcı ile ilişkilendirme
    departureCity: String,
    destinationCity: String,
    lastCheckedPrice: Number,
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Trip', tripSchema);
