"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var request = require("request");
var express = require("express");
var _ = require("lodash");
exports.player = express();
exports.player.put('/play', function (req, res) {
    if (!req.session.refresh_token && !req.session.access_token)
        return res.sendStatus(403);
    if (!req.body.uri)
        return res.sendStatus(400);
    var access_token;
    for (var _i = 0, _a = req.headers.cookie.split(';'); _i < _a.length; _i++) {
        var cookie = _a[_i];
        if (_.startsWith(_.trim(cookie), 'access_token')) {
            access_token = cookie.substring(14);
        }
    }
    if (!access_token)
        return res.sendStatus(403);
    var data = {
        'uris': [req.body.uri]
    };
    var options = {
        url: 'https://api.spotify.com/v1/me/player/play',
        body: JSON.stringify(data),
        headers: {
            Authorization: 'Bearer ' + access_token,
        }
    };
    // console.log(options);
    request.put(options, function (error, response, body) {
        console.log(response);
        if (error || response.statusCode != 204)
            return res.sendStatus(500);
        return res.sendStatus(204);
    });
});
