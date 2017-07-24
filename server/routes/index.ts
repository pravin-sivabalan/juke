import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as session from 'express-session';
import { Express } from 'express';
import { auth } from './auth-router';
import { track } from './track-router';
import { player } from './player-router';
import { properties } from '../utils/properties';
let MongoDBStore = require('connect-mongodb-session')(session);

export let app: Express = express();
let store = new MongoDBStore({ uri: properties.database.mongodb, collection: 'mySessions' });

app.use(require('express-session')({
  secret: 'SessionSecret',
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 // 1 day
  },
  store: store,
  resave: true,
  saveUninitialized: true
}));
app.use(bodyParser.json());

app.use('/api/auth', auth);
app.use('/api/tracks', track);
app.use('/api/player', player);

app.get('/api/test', function(req, res) {
  res.send('Hello ' + JSON.stringify(req.session));
});
