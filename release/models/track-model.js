"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
exports.TrackSchema = new mongoose.Schema({
    uri: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    artist: {
        type: String,
        required: true
    },
    albumName: {
        type: String,
        required: true
    },
    albumArt: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    upVotedUsers: {
        type: [String],
        default: []
    },
    downVotedUsers: {
        type: [String],
        default: []
    },
    votes: {
        type: Number, default: 0
    }
});
exports.Track = mongoose.model('Track', exports.TrackSchema, 'track');
