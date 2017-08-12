import * as express from 'express';
import * as request from 'request';
import { properties } from '../utils/properties';
import { Express, Request, Response } from 'express';
import { IRoom, RoomSchema, Room } from '../models/room-model';

export const auth: Express = express();

auth.get('/create', (req: Request, res: Response) => {
  // TODO: randomly generate
  if(!req.query.username || !req.query.room) return res.sendStatus(400);
  req.session.username = req.query.username;
  req.session.room = req.query.room;
  let newRoom = new Room({code:req.session.room});
  newRoom.save((err: Error) => {
    if(err) return res.sendStatus(500);
    return res.redirect('https://accounts.spotify.com/authorize?client_id=' + properties.externalServices.spotify.client_id + '&response_type=code&redirect_uri=' + properties.externalServices.spotify.callback + '&scope=user-modify-playback-state');
  });
});

auth.post('/join', (req: Request, res: Response) => {
  if(!req.body.username || !req.body.room) return res.sendStatus(400);
  req.session.username = req.body.username;
  req.session.room = req.body.room;
  return res.json(204);
});

auth.get('/refresh', (req: Request, res: Response) => {
  if(req.session.refresh_token) {
    let options = {
        url: 'https://accounts.spotify.com/api/token',
        form: {
          'grant_type': 'refresh_token',
          'refresh_token': req.session.refresh_token
        },
        headers: {
          'Authorization':'Basic ' + properties.externalServices.spotify.base64
        }
    }
    request.post(options, (error, response, body) => {
      if(error) return res.sendStatus(500);
      if(response.statusCode != 200) return res.sendStatus(500);
      const access_token = JSON.parse(body).access_token
      Room.findOneAndUpdate({'code':req.session.room}, {access_token:access_token}, function(err: Error, room: IRoom){
        if(err) return res.send(500);
        res.cookie('access_token', access_token);
        return res.sendStatus(200);
      });
    });
  } else {
    let options = {
        url: 'https://accounts.spotify.com/api/token',
        form: {
          'grant_type': 'client_credentials'
        },
        headers: {
          'Authorization':'Basic ' + properties.externalServices.spotify.base64
        }
    }
    request.post(options, (error, response, body) => {
      if(error) return res.sendStatus(500);
      if(response.statusCode != 200) return res.sendStatus(500);
      const access_token = JSON.parse(body).access_token
      Room.findOneAndUpdate({'code':req.session.room}, {access_token:access_token}, function(err: Error, room: IRoom){
        if(err) return res.send(500);
        res.cookie('access_token', access_token);
        return res.sendStatus(200);
      });
    });
  }
});

auth.get('/callback', (req: Request, res: Response) => {
  let options = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        'grant_type': 'authorization_code',
        'code': req.query.code,
        'redirect_uri': properties.externalServices.spotify.callback
      },
      headers: {
        'Authorization':'Basic ' + properties.externalServices.spotify.base64
      }
  }
  request.post(options, (error, response, body) => {
    body = JSON.parse(body);
    req.session.refresh_token = body.refresh_token;
    res.cookie('access_token', req.session.access_token)
    return res.redirect('/dash');
  });
});
