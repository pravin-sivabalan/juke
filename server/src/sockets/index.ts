import * as socket from 'socket.io';
import * as http from 'http';

export class Socket {
  _socket: any;

  constructor(server: http.Server){
    this._socket = socket(server);
    this.start();
  }

  start(){
    this._socket.on('connection', function(client: any){
      console.log('connected');
      client.on('track', (data: any) => {
        console.log(data);
        client.broadcast.emit('new track', data);
      });
      client.on('disconnect', function(){});
    });
  }
}
