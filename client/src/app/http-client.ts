import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {CookieService} from 'angular2-cookie/core';

@Injectable()
export class HttpClient {

  constructor(private http: Http, private _cookieService:CookieService) { }

  createAuthorizationHeader(headers: Headers) {
    headers.append('Authorization', 'Bearer ' + this._cookieService.get('access_token'));
  }

  get(url) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.get(url, {
      headers: headers
    });
  }

  post(url, data) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.post(url, data, {
      headers: headers
    });
  }
}
