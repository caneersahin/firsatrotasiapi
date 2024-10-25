const express = require('express');
const axios = require('axios');
const cors = require('cors'); // CORS paketini içe aktar

const app = express();
const PORT = 3005;

app.use(cors()); // CORS'u etkinleştir



app.get('/api/getAllTurkiyeForAllCounty', async (req, res) => {
  try {
    const urls = "https://api.biryere.com/api/v4/deals?limit=50&page=1&origin1CountryCodes=TR&origin1CityNames=&destinationCountryCodes=ABROAD&destinationCityNames=&type=3&season=&month=&holiday=&weekend=&duration=&source=&priceMax=&sortBy=p&fromTs=true&lat=0&long=0&oneResult=true";
    
    const response = await axios.get(urls);
    res.json(response.data); // Dönen veriyi frontend'e gönder
  } catch (error) {
    res.status(500).json({ error: 'Bir hata oluştu' });
  }
});

// API isteği atan route
app.get('/api/getIstanbulForAllCounty', async (req, res) => {
  try {
    const urls = "https://api.biryere.com/api/v4/deals?limit=50&page=1&origin1CountryCodes=TR&origin1CityNames=Istanbul&destinationCountryCodes=ABROAD&destinationCityNames=&type=3&season=&month=&holiday=&weekend=&duration=&source=&priceMax=&sortBy=p&fromTs=true&lat=0&long=0&oneResult=true";
    
    const response = await axios.get(urls);
    res.json(response.data); // Dönen veriyi frontend'e gönder
  } catch (error) {
    res.status(500).json({ error: 'Bir hata oluştu' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
