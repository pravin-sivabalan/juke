import * as request from 'request';
import * as express from 'express';
import * as _ from 'lodash';
import { socket } from '../socket';
import { Express, Request, Response } from 'express';
import { ITrack, TrackSchema, Track, IRoom, RoomSchema, Room } from '../models/index';

export let player: Express = express();

player.put('/play', (req: Request, res: Response) => {
  if(!req.session.refresh_token && !req.session.access_token) return res.sendStatus(403);
  if(!req.body.uri) return res.sendStatus(400);
  let access_token: string;
  for(const cookie of req.headers.cookie.split(';')) {
    if(_.startsWith(_.trim(cookie), 'access_token')) {
      access_token = cookie.substring(14);
    }
  }
  if(!access_token) return res.sendStatus(403);
  let data = {
    'uris': [req.body.uri]
  }
  let options = {
      url: 'https://api.spotify.com/v1/me/player/play',
      body: JSON.stringify(data),
      headers: {
        Authorization: 'Bearer ' + access_token,
      }
  }
  request.put(options, (error, response, body) => {
    if(error || response.statusCode != 204) return res.sendStatus(500);
    return res.sendStatus(204);
  });
});

player.get('/start', (req: Request, res: Response) => {
  if(!req.session.refresh_token && !req.session.access_token) return res.sendStatus(403);
  play(req.session.room);
});

function play(roomCode: string) {
  Room.find({code:roomCode}, (err: Error, rooms: IRoom[]) => {
    if(err) return;
    Track.find({}, (err: Error, tracks: ITrack[]) => {
      if(err) return;
      const playingTrack = _.clone(tracks[0]);
      const data = { uris: [playingTrack.uri] };
      const options = {
        url: 'https://api.spotify.com/v1/me/player/play',
        body: JSON.stringify(data),
        headers: { Authorization: 'Bearer ' + rooms[rooms.length-1].access_token }
      }
      if(err) return;
      request.put(options, (error: Error, response: any, body: any) => {
        console.log((new Date).toISOString() + ' ' + playingTrack.uri);
        if(error || response.statusCode != 204) return;
        Track.find({played: true}, (err: Error, tracks: ITrack[]) => {
          if(err) return;
          for(const track of tracks) {
            if(track.played == true) {
              Track.findByIdAndRemove(track._id, (err: Error) => {
                if(err) return;
                socket.emitDeleteTrack(track._id);
              });
            }
          }
          playingTrack.played = true;
          Track.findByIdAndUpdate(playingTrack._id, {$set: playingTrack}, (err: Error, track: ITrack) => {
            if(err || !track) return;
            _.delay(play, playingTrack.duration, roomCode);
          });
        });
      });
    });
  });
}
