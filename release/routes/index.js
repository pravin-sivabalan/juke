"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var bodyParser = require("body-parser");
var session = require("express-session");
var auth_router_1 = require("./auth-router");
var track_router_1 = require("./track-router");
var player_router_1 = require("./player-router");
var properties_1 = require("../utils/properties");
var MongoDBStore = require('connect-mongodb-session')(session);
exports.app = express();
var store = new MongoDBStore({ uri: properties_1.properties.database.mongodb, collection: 'mySessions' });
exports.app.use(require('express-session')({
    secret: 'SessionSecret',
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // 1 day
    },
    store: store,
    resave: true,
    saveUninitialized: true
}));
exports.app.use(bodyParser.json());
exports.app.use('/api/auth', auth_router_1.auth);
exports.app.use('/api/tracks', track_router_1.track);
exports.app.use('/api/player', player_router_1.player);
exports.app.get('/api/test', function (req, res) {
    res.send('Hello ' + JSON.stringify(req.session));
});
