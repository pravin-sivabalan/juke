import {Express, Request, Response} from 'express';
import {addRoom} from '../routes/rooms-router';
import {properties} from '../utils/properties';
import * as express from 'express';
import * as request from 'request';

export let router: Express = express();

router.get('/spotify', (req: Request, res: Response) => {
  res.redirect('https://accounts.spotify.com/authorize?client_id=' + properties.externalService.spotifyService.client_id + '&response_type=code&redirect_uri=' + properties.externalService.spotifyService.callback + '&scope=user-modify-playback-state&show_dialog=true');
});

router.get('/spotify/callback', (req: Request, res: Response) => {
  var options = {
      url: 'https://accounts.spotify.com/api/token',
      method: 'POST',
      form: {
        'grant_type': 'authorization_code',
        'code': req.query.code,
        'redirect_uri': properties.externalService.spotifyService.callback,
        'client_id': properties.externalService.spotifyService.client_id,
        'client_secret': properties.externalService.spotifyService.client_secret
      }
  }

  request.post(options, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      body = JSON.parse(body);
      let access_token = body.access_token;
      let refresh_token = body.refresh_token;
      var options = {
          url: 'https://api.spotify.com/v1/me',
          method: 'GET',
          headers: {
            'Authorization': "Bearer " + access_token
          },
          form: {
            'uris': '["spotify:track:4iV5W9uYEdYUVa79Axb7Rh"]'
          }
      }
      request.get(options, (error, response, body) => {
        body = JSON.parse(body);
        if(addRoom(body.id, access_token, refresh_token)) return res.sendStatus(500);
        res.cookie('access_token', access_token);
        res.redirect('http://localhost:4200/search/' + body.id);
      });
    }
  });
});
