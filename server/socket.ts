import * as socketIO from 'socket.io';
import * as http from 'http';
import { ITrack } from './models/track-model';

export class Socket {
  _socket: any;

  constructor() { }

  listen(server: http.Server) {
    this._socket = socketIO(server);
    this._socket.on('connection', (socket) => {
      console.log('client connected');
    });
  }

  emitTrack(track: ITrack) {
    this._socket.emit('track', track);
  }

  emitVote(id: string, votes: number) {
    this._socket.emit('vote', {
      _id: id,
      votes: votes
    });
  }

}

export let socket = new Socket();
