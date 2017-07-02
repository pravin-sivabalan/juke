"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http = require("http");
var mongoose = require("mongoose");
var index_1 = require("./routes/index");
var properties_1 = require("./utils/properties");
var index_2 = require("./sockets/index");
var Server = (function () {
    function Server() {
        this._app = index_1.app;
        this._server = http.createServer(this._app);
        this._socket = new index_2.Socket(this._server);
    }
    Server.prototype.start = function () {
        this._server.listen(3000);
        console.log('Server listening on port 3000');
        mongoose.connect(properties_1.properties.database.mongodb);
    };
    return Server;
}());
var server = new Server();
server.start();
