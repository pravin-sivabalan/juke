"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var request = require("request");
var express = require("express");
var _ = require("lodash");
var socket_1 = require("../socket");
var index_1 = require("../models/index");
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
    request.put(options, function (error, response, body) {
        if (error || response.statusCode != 204)
            return res.sendStatus(500);
        return res.sendStatus(204);
    });
});
exports.player.get('/start', function (req, res) {
    if (!req.session.refresh_token && !req.session.access_token)
        return res.sendStatus(403);
    play(req.session.room);
});
function play(roomCode) {
    index_1.Room.find({ code: roomCode }, function (err, rooms) {
        if (err)
            return;
        index_1.Track.find({}, function (err, tracks) {
            if (err)
                return;
            var playingTrack = _.clone(tracks[0]);
            var data = { uris: [playingTrack.uri] };
            var options = {
                url: 'https://api.spotify.com/v1/me/player/play',
                body: JSON.stringify(data),
                headers: { Authorization: 'Bearer ' + rooms[rooms.length - 1].access_token }
            };
            if (err)
                return;
            request.put(options, function (error, response, body) {
                console.log((new Date).toISOString() + ' ' + playingTrack.uri);
                if (error || response.statusCode != 204)
                    return;
                index_1.Track.find({ played: true }, function (err, tracks) {
                    if (err)
                        return;
                    var _loop_1 = function (track) {
                        if (track.played == true) {
                            index_1.Track.findByIdAndRemove(track._id, function (err) {
                                if (err)
                                    return;
                                socket_1.socket.emitDeleteTrack(track._id);
                            });
                        }
                    };
                    for (var _i = 0, tracks_1 = tracks; _i < tracks_1.length; _i++) {
                        var track = tracks_1[_i];
                        _loop_1(track);
                    }
                    playingTrack.played = true;
                    index_1.Track.findByIdAndUpdate(playingTrack._id, { $set: playingTrack }, function (err, track) {
                        if (err || !track)
                            return;
                        _.delay(play, playingTrack.duration, roomCode);
                    });
                });
            });
        });
    });
}
