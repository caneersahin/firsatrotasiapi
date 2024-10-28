// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    surname: String,
    phoneNumber: String,
    preferences: {
        notificationType: { type: String, enum: ['SMS', 'Email'], default: 'SMS' },
        budgetLimit: Number,
    },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', userSchema);
