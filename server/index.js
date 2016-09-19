'use strict';

const express = require('express');
const app = express();
const http = require('http');
const dist = __dirname + '/../dist';
const PORT = process.env.PORT;

app.use('/', express.static(dist));

app.all('/*', function all(req, res) {
	res.sendFile('index.html', {root: dist});
});

http.createServer(app).listen(PORT);