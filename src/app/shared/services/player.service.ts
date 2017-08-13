import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Track } from '../model/track';

@Injectable()
export class PlayerService {

  constructor(private http :Http) { }

  play() {
    return this.http.get('/api/player/start')
      .map((res: Response) => res.json())
      .catch((err: Error) => Observable.throw('Error playing music'));
  }

}
