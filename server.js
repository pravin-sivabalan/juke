const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const api = require('./api/routes/index.js');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'app')));

app.use('/api/v1', api.app);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'app/index.html'));
});

const port = process.env.PORT || '3000';

app.set('port', port);

const server = http.createServer(app);

mongoose.connect(properties.env.MONGO || 'mongodb://localhost/juke');

server.listen(port, () => console.log(`Running on localhost:${port}`));
