import * as express from 'express';
import * as request from 'request';
import { properties } from '../utils/properties';
import { Express, Request, Response } from 'express';

export const auth: Express = express();

auth.get('/refresh', (req: Request, res: Response) => {
  const options = {
      url: 'https://accounts.spotify.com/api/token',
      method: 'POST',
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
    res.cookie('access_token', JSON.parse(body).access_token);
    res.sendStatus(200);
  })

});

auth.post('/join', (req: Request, res: Response) => {
  const body = req.body;
  if(!req.body.username || !req.body.room) {
    return res.sendStatus(400);
  }
  req.session.username = req.body.username;
  req.session.room = req.body.room;
  return res.json(204);

});
