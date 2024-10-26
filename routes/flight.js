const express = require('express');
const axios = require('axios');
const UserRegister = require('../models/FlightModel.js'); // Flight modelini içe aktar
const router = express.Router();

router.get('/getAllTurkiyeForAllCounty', async (req, res) => {
    try {
        const urls = "https://api.biryere.com/api/v4/deals?limit=50&page=1&origin1CountryCodes=TR&origin1CityNames=&destinationCountryCodes=ABROAD&destinationCityNames=&type=3&season=&month=&holiday=&weekend=&duration=&source=&priceMax=&sortBy=p&fromTs=true&lat=0&long=0&oneResult=true";
        
        const response = await axios.get(urls);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Bir hata oluştu' });
    }
});

router.get('/getIstanbulForAllCounty', async (req, res) => {
    try {
        const urls = "https://api.biryere.com/api/v4/deals?limit=50&page=1&origin1CountryCodes=TR&origin1CityNames=Istanbul&destinationCountryCodes=ABROAD&destinationCityNames=&type=3&season=&month=&holiday=&weekend=&duration=&source=&priceMax=&sortBy=p&fromTs=true&lat=0&long=0&oneResult=true";
        
        const response = await axios.get(urls);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Bir hata oluştu' });
    }
});
// Kullanıcı kaydı için route ekle
router.post('/register', async (req, res) => {
    const { userEmail, userPhone, departureCity, arrivalCity } = req.body;

    console.log("girdi -->"); // Giriş verisini konsola yazdır

    try {
        // Flight modelini kullanarak yeni bir kayıt oluştur
        const UserRegisters = new UserRegister({
            userEmail,
            userPhone,
            departureCity,
            arrivalCity,
            lastCheckedPrice: 0 // İlk kayıt için varsayılan değer
        });

        await UserRegisters.save();
        res.status(201).send('Kayıt başarıyla oluşturuldu');
    console.log("oldu"); // Giriş verisini konsola yazdır

    } catch (error) {
        console.error(error); // Hata mesajını konsola yazdır
        res.status(500).send('Bir hata oluştu');
    console.log("olmadı"); // Giriş verisini konsola yazdır

    }
});


module.exports = router;
