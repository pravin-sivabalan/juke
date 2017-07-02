"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
exports.RoomSchema = new mongoose.Schema({
    room: {
        type: String,
        required: true
    },
    access_token: {
        type: String,
        required: true
    },
    refresh_token: {
        type: String,
        required: true
    },
    enter_token: {
        type: String,
    }
});
exports.Room = mongoose.model('Room', exports.RoomSchema, 'room');
