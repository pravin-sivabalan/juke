import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';
import { Http, RequestOptions, Headers } from '@angular/http';
import { CookieService } from 'angular2-cookie/core';

@Injectable()
export class SpotifyService {
  rootUrl: string;

  constructor(private http :Http, private cookieService: CookieService) {
    this.rootUrl = 'https://api.spotify.com/v1';
  }

  search(terms: Subject<string>) {
    if(terms)
    return terms.debounceTime(400)
      .distinctUntilChanged()
      .switchMap(term => term ? this.searchEntries(term) : Observable.empty<Response>());

  }

  searchEntries(track :string) {
    const options = new RequestOptions({
      headers: new Headers({
        'Authorization': 'Bearer ' + this.cookieService.get('access_token')
      })
    });

    return this.http.get(this.rootUrl + '/search?type=track&q=' + track, options)
        .map(res => {
          if(res.status != 200) throw new Error();
          return res.json();
        });
  }

}
