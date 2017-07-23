export class Properties {
  database;
  externalServices;
  server;

  constructor(){
    this.database = require('../configs/database.json');
    this.externalServices = require('../configs/external-services.json');
    this.server = require('../configs/server.json');
  }
}

export const properties = new Properties();
