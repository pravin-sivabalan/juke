import * as request from 'request';
import * as express from 'express';
import * as _ from 'lodash';
import { socket } from '../socket';
import { Express, Request, Response } from 'express';

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
  // console.log(options);
  request.put(options, (error, response, body) => {
    console.log(response);
    if(error || response.statusCode != 204) return res.sendStatus(500);
    return res.sendStatus(204);
  });
});
