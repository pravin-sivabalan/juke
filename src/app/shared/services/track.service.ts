import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Track } from '../model/track';

@Injectable()
export class TrackService {

  constructor(private http :Http) { }

  getTracks(): Observable<Track[]> {
    return this.http.get('/api/tracks')
      .map((res: Response) => res.json())
      .catch((err: Error) => Observable.throw('Error fetching tracks'));
  }

  postTrack(track: Track) {
    return this.http.post('/api/tracks', track);
  }

  upVoteTrack(id: string) {
    return this.http.get('/api/tracks/upvote/' + id)
      .map((res: Response) => res.json())
      .catch((err: Error) => Observable.throw('Error voting'));
  }

  downVoteTrack(id: string) {
    return this.http.get('/api/tracks/downvote/' + id)
      .map((res: Response) => res.json())
      .catch((err: Error) => Observable.throw('Error voting'));
  }


}
