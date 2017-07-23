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
    Socket.prototype.emitTrack = function (track) {
        this._socket.emit('track', track);
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
