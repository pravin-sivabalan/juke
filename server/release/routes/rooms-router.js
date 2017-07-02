"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var index_1 = require("../model/index");
exports.router = express();
exports.router.get('/', function (req, res) {
    index_1.Room.find({}, function (err, iroom) {
        if (err)
            return res.sendStatus(500);
        res.json(iroom);
    });
});
exports.router.post('/', function (req, res) {
    var newRoom = new index_1.Room(req.body);
    newRoom.save(function (err) {
        if (err)
            return res.sendStatus(500);
        res.sendStatus(200);
    });
});
exports.router.delete('/:id', function (req, res) {
    index_1.Room.findByIdAndRemove(req.params.id, function (err) {
        if (err)
            return res.sendStatus(500);
        res.sendStatus(200);
    });
});
exports.addRoom = function (admin, access_token, refresh_token) {
    var newRoom = new index_1.Room({
        "admin": admin,
        "access_token": access_token,
        "refresh_token": refresh_token
    });
    newRoom.save(function (err) {
        if (err)
            return err;
    });
};
