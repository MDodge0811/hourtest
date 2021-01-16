const express = require('express');
const cors = require('cors');
const fs = require('fs');
const util = require('util');

const port = 3001;
const app = express();

app.use(cors());

const readFile = util.promisify(fs.readFile);

const getData = async (filename) => {
	const data = await readFile(filename, 'utf8');
	const parsedData = JSON.parse(data);
	return parsedData;
};

const search = (query, json) => {
	const results = json.filter((object) => {
		let check = true;
		for (key in query) {
			check = false;
			if (object[key].toLowerCase().includes(query[key].toLowerCase())) {
				check = true;
			}
			if (!check) {
				break;
			}
		}
		if (!!check) {
			return object;
		}
	});
	return results;
};

app.get('/', async (req, res) => {
	const data = await getData('./superheroes.json');
	const results = search(req.query, data);
	res.json(results);
});

app.listen(port, () => {
	console.log(`listening on port ${port}`);
});
