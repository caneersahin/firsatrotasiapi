const express = require('express');
const axios = require('axios');
const router = express.Router();

const User = require('../models/User.js');
const Trip = require('../models/Trip');
const Notification = require('../models/Notification');

const sendSms = require('../helperFunc.js');



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

router.get('/getFligtListForQuery', async (req, res) => {
    const { origin1CityNames, destinationCityNames } = req.query;
    console.log("girdi")
    // URL'yi dinamik hale getirmek için parametreleri kullanıyoruz
    const urls = `https://api.biryere.com/api/v4/deals?limit=50&page=1&origin1CountryCodes=TR&origin1CityNames=${origin1CityNames}&destinationCountryCodes=ABROAD&destinationCityNames=${destinationCityNames}&type=3&season=&month=&holiday=&weekend=&duration=&source=&priceMax=&sortBy=p&fromTs=true&lat=0&long=0&oneResult=true`;

    try {
        const response = await axios.get(urls);

        console.log("response-->", response)

        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Bir hata oluştu' });
    }
});


// Kullanıcı Oluşturma
router.post('/register', async (req, res) => {
    const { name, surname, phoneNumber, notificationType, budgetLimit, departureCity, destinationCity } = req.body;
    try {
        // Kullanıcı kaydı
        const user = new User({
            name,
            surname,
            phoneNumber,
            preferences: {
                notificationType,
                budgetLimit,
            },
        });
        const savedUser = await user.save(); // Kullanıcıyı kaydet

        // Seyahat kaydı
        const trip = new Trip({
            userId: savedUser._id, // Kullanıcı ID'sini ilişkilendir
            departureCity,
            destinationCity,
            lastCheckedPrice: 0, // Varsayılan değer
        });
        await trip.save(); // Seyahati kaydet
        console.log("test--->", name, surname, phoneNumber, notificationType, budgetLimit, departureCity, destinationCity)

        message="Kaydınız başarıyla tamamlandı. En ucuz bilet fiyatı için bizden mesaj bekleyin! :)"
        console.log("message-->", message)

        // SMS gönder
        sendSms.sendSms(message, [phoneNumber]); // Telefon numarasını bir dizi içinde gönder
        // Uçuş listesini almak için API'ye istek at
        const flightListResponse = await axios.get(`https://api.biryere.com/api/v4/deals?limit=50&page=1&origin1CountryCodes=TR&origin1CityNames=${departureCity}&destinationCountryCodes=&destinationCityNames=${destinationCity}&type=3&season=&month=&holiday=&weekend=&duration=&source=&priceMax=&sortBy=s&fromTs=true&lat=0&long=0&oneResult=true`);
        // API'den dönen uçuş verisini işle
        const flightList = flightListResponse.data.data; // Uçuş listesi
        let message = "Yeni Uçuşlar:\n";
        // Uçuşları mesaj olarak ekle
        if (flightList && flightList.length > 0) {
            message += `Kalkış: ${flightList[0].origin1CityName} - Varış: ${flightList[0].origin2CityName} - En uygun fiyat: ${flightList[0].minPrice}\n`; // flight.someProperty uygun şekilde değiştir
        } else {
            message += "Herhangi bir uçuş bulunamadı.";
        }
        sendSms.sendSms(message, [phoneNumber]); // Telefon numarasını bir dizi içinde gönder


        message="Kaydınız başarıyla tamamlandı. En ucuz bilet fiyatı için bizden mesaj bekleyin! :)"
        console.log("message-->", message)

        // SMS gönder
        sendSms.sendSms(message, [phoneNumber]); // Telefon numarasını bir dizi içinde gönder

        res.status(200).json({ user: savedUser, trip }); // Başarılı yanıt
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Bir hata oluştu' }); // Hata durumu
    }
});

// Bildirim Gönderme ve Kaydetme
router.post('/api/notifications', async (req, res) => {
    try {
        const notification = new Notification(req.body);
        await notification.save();
        res.status(201).json(notification);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


module.exports = router;
