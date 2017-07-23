"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var request = require("request");
var properties_1 = require("../utils/properties");
exports.auth = express();
exports.auth.get('/refresh', function (req, res) {
    var options = {
        url: 'https://accounts.spotify.com/api/token',
        method: 'POST',
        form: {
            'grant_type': 'client_credentials'
        },
        headers: {
            'Authorization': 'Basic ' + properties_1.properties.externalServices.spotify.base64
        }
    };
    request.post(options, function (error, response, body) {
        if (error)
            return res.sendStatus(500);
        if (response.statusCode != 200)
            return res.sendStatus(500);
        res.cookie('access_token', JSON.parse(body).access_token);
        res.sendStatus(200);
    });
});
exports.auth.post('/join', function (req, res) {
    var body = req.body;
    if (!req.body.username || !req.body.room) {
        return res.sendStatus(400);
    }
    req.session.username = req.body.username;
    req.session.room = req.body.room;
    return res.json(204);
});
