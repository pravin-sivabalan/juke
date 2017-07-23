"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http = require("http");
var mongoose = require("mongoose");
var bluebird = require("bluebird");
var socket_1 = require("./socket");
var index_1 = require("./routes/index");
var properties_1 = require("./utils/properties");
var Server = (function () {
    function Server() {
        this._app = index_1.app;
        this._server = http.createServer(this._app);
        socket_1.socket.listen(this._server);
    }
    Server.prototype.start = function () {
        this._server.listen(properties_1.properties.server.port);
        console.log('Server listening on port ' + properties_1.properties.server.port);
        mongoose.Promise = bluebird;
        mongoose.connect(properties_1.properties.database.mongodb);
    };
    return Server;
}());
var server = new Server();
server.start();
