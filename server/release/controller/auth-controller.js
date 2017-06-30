import { addRoom } from '../routes/rooms-router';
import * as request from 'request';
export const AuthController = (() => {
    let control = {
        redirectToAuth(req, res) {
            let client_id = 'e13bc06943214dfb8ad135797f4a9825';
            res.redirect('https://accounts.spotify.com/authorize?client_id=' + client_id + '&response_type=code&redirect_uri=http://localhost:3000/auth/spotify/callback&scope=user-modify-playback-state&show_dialog=true');
        },
        sucessAuth(req, res) {
            let client_id = 'e13bc06943214dfb8ad135797f4a9825';
            let client_secret = '34e27421344f4c009098c49f247a4ed6';
            var options = {
                url: 'https://accounts.spotify.com/api/token',
                method: 'POST',
                form: {
                    'grant_type': 'authorization_code',
                    'code': req.query.code,
                    'redirect_uri': 'http://localhost:3000/auth/spotify/callback',
                    'client_id': client_id,
                    'client_secret': client_secret
                }
            };
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
                    };
                    request.get(options, (error, response, body) => {
                        body = JSON.parse(body);
                        if (addRoom(body.id, access_token, refresh_token))
                            return res.sendStatus(500);
                        res.cookie('access_token', access_token);
                        res.redirect('http://localhost:4200/search/' + body.id);
                    });
                }
            });
        }
    };
    return control;
})();
