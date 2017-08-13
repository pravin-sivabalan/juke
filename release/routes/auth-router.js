"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var request = require("request");
var properties_1 = require("../utils/properties");
var room_model_1 = require("../models/room-model");
exports.auth = express();
exports.auth.get('/create', function (req, res) {
    // TODO: randomly generate
    if (!req.query.username || !req.query.room)
        return res.sendStatus(400);
    req.session.username = req.query.username;
    req.session.room = req.query.room;
    var newRoom = new room_model_1.Room({ code: req.session.room });
    newRoom.save(function (err) {
        if (err)
            return res.sendStatus(500);
        return res.redirect('https://accounts.spotify.com/authorize?client_id=' + properties_1.properties.externalServices.spotify.client_id + '&response_type=code&redirect_uri=' + properties_1.properties.externalServices.spotify.callback + '&scope=user-modify-playback-state');
    });
});
exports.auth.post('/join', function (req, res) {
    if (!req.body.username || !req.body.room)
        return res.sendStatus(400);
    room_model_1.Room.findOne({ code: req.body.room }, function (err, room) {
        if (err || !room)
            return res.sendStatus(404);
        req.session.username = req.body.username;
        req.session.room = req.body.room;
        res.sendStatus(204);
    });
});
exports.auth.get('/isLoggedIn', function (req, res) {
    if (req.session.username || req.session.room) {
        res.json({ isLoggedIn: true });
    }
    else {
        res.json({ isLoggedIn: false });
    }
});
exports.auth.get('/refresh', function (req, res) {
    if (req.session.refresh_token) {
        var options = {
            url: 'https://accounts.spotify.com/api/token',
            form: {
                'grant_type': 'refresh_token',
                'refresh_token': req.session.refresh_token
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
            var access_token = JSON.parse(body).access_token;
            room_model_1.Room.findOneAndUpdate({ 'code': req.session.room }, { access_token: access_token }, function (err, room) {
                if (err)
                    return res.send(500);
                res.cookie('access_token', access_token);
                return res.sendStatus(200);
            });
        });
    }
    else {
        var options = {
            url: 'https://accounts.spotify.com/api/token',
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
            var access_token = JSON.parse(body).access_token;
            room_model_1.Room.findOneAndUpdate({ 'code': req.session.room }, { access_token: access_token }, function (err, room) {
                if (err)
                    return res.send(500);
                res.cookie('access_token', access_token);
                return res.sendStatus(200);
            });
        });
    }
});
exports.auth.get('/callback', function (req, res) {
    var options = {
        url: 'https://accounts.spotify.com/api/token',
        form: {
            'grant_type': 'authorization_code',
            'code': req.query.code,
            'redirect_uri': properties_1.properties.externalServices.spotify.callback
        },
        headers: {
            'Authorization': 'Basic ' + properties_1.properties.externalServices.spotify.base64
        }
    };
    request.post(options, function (error, response, body) {
        body = JSON.parse(body);
        req.session.refresh_token = body.refresh_token;
        res.cookie('access_token', req.session.access_token);
        return res.redirect('/dash');
    });
});
