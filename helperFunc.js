var axios = require('axios');

function sendSms(message, numberList) {
	var data = JSON.stringify({
		"api_id": "b628de6d8cab41f2a92c74d2",
		"api_key": "c1dc37ccf848b6d93aecf1f9",
		"sender": "CANER SAHIN",
		"message_type": "normal", //trkçe sms göndermek için turkce yaziniz
		"message": message,
		"message_content_type": "bilgi",
		"phones": numberList
	});
	var config = {
		method: 'post',
		url: 'https://api.vatansms.net/api/v1/1toN',
		headers: {
			'Content-Type': 'application/json',
		},
		data: data
	};

	axios(config)
		.then(function (response) {
			console.log(JSON.stringify(response.data));
			console.log("mesaj ulaştı");
		})
		.catch(function (error) {
			console.log(error);
			console.log("hata verdi");
		});
}

module.exports = {
	sendSms: sendSms,
};