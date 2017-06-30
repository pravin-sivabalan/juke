import * as http from 'http';
import { app } from './routes/index';
import * as mongoose from 'mongoose';
class Server {
    constructor() {
        this._app = app;
        this._server = http.createServer(this._app);
    }
    start() {
        this._server.listen(3000);
        console.log('Server listening on port 3000');
        mongoose.connect('mongodb://localhost:27017/juke');
    }
}
let server = new Server();
server.start();
