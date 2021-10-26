var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var cors = require('cors');
var axios = require('axios');

app.use(cors());
app.use(bodyParser.json());

//Create your endpoints HERE

app.get('/api/img/random', async (req, res) => {
	try {
		const img = await axios.get('https://dog.ceo/api/breeds/image/random');
		res.json(img.data);
	} catch (err) {
		console.log(err);
	}
});

app.get('/api/breeds', async (req, res) => {
	try {
		const list = await axios.get('https://dog.ceo/api/breeds/list/all');
		res.json(list.data);
	} catch (err) {
		console.log(err);
	}
});

app.get('/api/img/:breed', async (req, res) => {
	const breed = req.params.breed;
	try {
		const img = await axios.get(
			`https://dog.ceo/api/breed/${breed}/images/random`
		);
		res.json(img.data);
	} catch (err) {
		console.log(err);
	}
});

app.get('*', function (req, res) {
	res.status(404).send('Not found');
});

// End

app.listen(8001, function () {
	console.log('App running on port 8001');
});
