import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Http, Response } from '@angular/http';
import { CookieService } from 'angular2-cookie/core';

@Injectable()
export class AuthService {

  constructor(private http: Http, private cookieService: CookieService) { }

  refreshToken() {
    this.http.get('/api/auth/refresh').subscribe(
      (response: Response) => {
        console.log('refreshed token');
      },
      (err) => {
        console.log('Error: ' + err);
      }
    );
  }

  joinRoom(room: String, username: String) {
    this.http.post('/api/auth/join', {room: room, username: username}).subscribe(
      (response: Response) => {
         console.log('joining room');
      },
      (err) => {
         console.log('Error: ' + err);
      }
    );
  }

  isLoggedIn() {
    return this.http.get('/api/auth/isLoggedIn')
    .map((res: Response) => res.json())
    .catch((err: Error) => Observable.throw('Error authenticating'));
  }

}
