import * as http from 'http';
import * as mongoose from 'mongoose';
import * as bluebird from 'bluebird';
import { socket } from './socket';
import { app } from './routes/index';
import { Express } from 'express';
import { properties } from './utils/properties';

class Server {
  public _app: Express;
  public _server: http.Server;
  private _socket: any;

  constructor() {
    this._app = app;
    this._server = http.createServer(this._app);
    socket.listen(this._server);
  }

  start() :void {
    this._server.listen(properties.server.port);
    console.log('Server listening on port ' + properties.server.port);

    mongoose.Promise = bluebird;
    mongoose.connect(properties.database.mongodb);
  }
}

let server = new Server();
server.start();
