"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Properties = (function () {
    function Properties() {
        this.database = require('../configs/database.json');
        this.externalServices = require('../configs/external-services.json');
        this.server = require('../configs/server.json');
    }
    return Properties;
}());
exports.Properties = Properties;
exports.properties = new Properties();
