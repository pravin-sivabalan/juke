"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
exports.TrackSchema = new mongoose.Schema({
    room: {
        type: String,
        required: true
    },
    votes: {
        type: Number,
        required: true,
        default: 0
    },
    trackName: {
        type: String,
        required: true
    },
    trackId: {
        type: String,
        required: true
    },
    artist: {
        type: String,
        required: true
    },
    album: {
        type: String,
        required: true
    },
    albumArt: {
        type: String,
        required: true
    }
});
exports.Track = mongoose.model('Track', exports.TrackSchema, 'track');
