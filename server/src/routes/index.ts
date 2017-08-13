import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as fs from 'fs';
import {Express} from 'express';
import {AuthController} from '../controller/index';
import {TrackController} from '../controller/index';

import {router as rooms} from './rooms-router';
import {router as tracks} from './tracks-router';

export let app :Express = express();

app.use(bodyParser.json());

app.use('/rooms', rooms);
app.use('/tracks', tracks);

app.get('/auth/spotify',  AuthController.redirectToAuth);
app.get('/auth/spotify/callback', AuthController.sucessAuth);
