import * as http from 'http';
import {Express} from 'express';
import {app} from './routes/index';
import {properties} from './utils/properties';
import * as mongoose from 'mongoose';


class Server {
  public _app: Express;
  public _server: http.Server;
  public _io :any;

  constructor() {
    this._app = app;
    this._server = http.createServer(this._app);
  }

  start() :void {
    this._server.listen(3000);
    console.log('Server listening on port 3000')

    mongoose.connect(properties.database.mongodb);
  }
}

let server = new Server();
server.start();
