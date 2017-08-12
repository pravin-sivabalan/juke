"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var express = require("express");
var socket_1 = require("../socket");
var index_1 = require("../models/index");
exports.track = express();
exports.track.get('/', function (req, res) {
    index_1.Track.find({}).lean().exec(function (err, data) {
        if (err)
            return res.sendStatus(500);
        var tracks = data;
        for (var i = 0; i < tracks.length; i++) {
            if (_.includes(tracks[i].upVotedUsers, req.session.username)) {
                tracks[i].upVoted = true;
            }
            else if (_.includes(tracks[i].downVotedUsers, req.session.username)) {
                tracks[i].downVoted = true;
            }
            delete tracks[i].upVotedUsers;
            delete tracks[i].downVotedUsers;
        }
        return res.json(tracks);
    });
});
exports.track.patch('/:id', function (req, res) {
    var updatedObj = req.body;
    index_1.Track.findByIdAndUpdate(req.params.id, { $set: updatedObj }, function (err, track) {
        if (err)
            return res.sendStatus(500);
        return res.json(track);
    });
});
exports.track.post('/', function (req, res) {
    var newTrack = new index_1.Track(req.body);
    newTrack.save(function (err) {
        if (err)
            return res.sendStatus(500);
        var track = _.clone(req.body);
        track._id = newTrack._id;
        track.votes = 0;
        socket_1.socket.emitAddTrack(track);
        return res.sendStatus(204);
    });
});
exports.track.delete('/:id', function (req, res) {
    index_1.Track.findByIdAndRemove(req.params.id, function (err) {
        if (err)
            return res.sendStatus(500);
        socket_1.socket.emitDeleteTrack(req.params.id);
        return res.sendStatus(204);
    });
});
exports.track.get('/upvote/:id', function (req, res) {
    index_1.Track.findById(req.params.id, function (err, track) {
        if (err)
            return res.sendStatus(500);
        if (_.includes(track.upVotedUsers, req.session.username))
            return res.sendStatus(409);
        track.votes++;
        track.upVoted = true;
        track.downVoted = false;
        track.upVotedUsers.push(req.session.username);
        for (var i = 0; i < track.downVotedUsers.length; i++) {
            if (track.downVotedUsers[i] === req.session.username) {
                track.downVotedUsers.splice(i, 1);
                break;
            }
        }
        var newTrack = new index_1.Track(track);
        newTrack.save(function (err) {
            if (err)
                return res.sendStatus(500);
            socket_1.socket.emitVote(newTrack._id, newTrack.votes);
            return res.json({ votes: newTrack.votes });
        });
    });
});
exports.track.get('/downvote/:id', function (req, res) {
    index_1.Track.findById(req.params.id, function (err, track) {
        if (err)
            return res.sendStatus(500);
        if (_.includes(track.downVotedUsers, req.session.username))
            return res.sendStatus(409);
        track.votes--;
        track.downVoted = true;
        track.upVoted = false;
        track.downVotedUsers.push(req.session.username);
        for (var i = 0; i < track.upVotedUsers.length; i++) {
            if (track.upVotedUsers[i] === req.session.username) {
                track.upVotedUsers.splice(i, 1);
                break;
            }
        }
        var newTrack = new index_1.Track(track);
        newTrack.save(function (err) {
            if (err)
                return res.sendStatus(500);
            socket_1.socket.emitVote(newTrack._id, newTrack.votes);
            return res.json({ votes: newTrack.votes });
        });
    });
});
