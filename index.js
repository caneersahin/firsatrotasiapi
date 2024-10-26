const express = require('express');
const axios = require('axios');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Ortam değişkenlerini yükle
dotenv.config();
// MongoDB bağlantısını yap

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB bağlantısı başarılı'))
  .catch((error) => console.error('MongoDB bağlantı hatası:', error));

const flightsRoute = require('./routes/flight'); // Bu satırı kontrol et

const app = express();
const PORT = process.env.PORT || 3005;

app.use(cors());
app.use(express.json()); // JSON gövde verilerini ayrıştır

// Rotayı kullan
app.use('/api/flights', flightsRoute);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

