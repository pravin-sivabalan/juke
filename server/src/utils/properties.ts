let externalServiceConfig = require('../../configs/external-service-config.json');
let databaseConfig = require('../../configs/database-config.json');

export class Properties {
  public externalService: any;
  public database: any;

  constructor(){
    this.externalService = externalServiceConfig;
    this.database = databaseConfig;
  }
}

export let properties = new Properties();
