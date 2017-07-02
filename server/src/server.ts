import * as http from 'http';
import * as mongoose from 'mongoose';
import {app} from './routes/index';
import {Express} from 'express';
import {properties} from './utils/properties';
import {Socket} from './sockets/index';


class Server {
  public _app: Express;
  public _server: http.Server;
  public _socket :any;

  constructor() {
    this._app = app;
    this._server = http.createServer(this._app);
    this._socket = new Socket(this._server);
  }

  start() :void {
    this._server.listen(3000);
    console.log('Server listening on port 3000');

    mongoose.connect(properties.database.mongodb);
  }
}

let server = new Server();
server.start();
