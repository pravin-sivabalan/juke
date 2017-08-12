"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var socketIO = require("socket.io");
var Socket = (function () {
    function Socket() {
    }
    Socket.prototype.listen = function (server) {
        this._socket = socketIO(server);
        this._socket.on('connection', function (socket) {
            console.log('client connected');
        });
    };
    Socket.prototype.emitAddTrack = function (track) {
        this._socket.emit('add track', track);
    };
    Socket.prototype.emitDeleteTrack = function (trackId) {
        this._socket.emit('delete track', trackId);
    };
    Socket.prototype.emitVote = function (id, votes) {
        this._socket.emit('vote', {
            _id: id,
            votes: votes
        });
    };
    return Socket;
}());
exports.Socket = Socket;
exports.socket = new Socket();
