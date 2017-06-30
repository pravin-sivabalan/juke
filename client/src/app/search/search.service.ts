import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { HttpClient } from '../http-client';

@Injectable()
export class SearchService {
  baseUrl :string = "https://api.spotify.com/v1";
  endpoint :string = "/search?type=track&q=";

  constructor(private http :HttpClient) { }

  search(terms: Observable<string>) {
    if(terms)
    return terms.debounceTime(400)
      .distinctUntilChanged()
      .switchMap(term => term ? this.searchEntries(term) : Observable.empty<Response>());

  }

  searchEntries(track :string) {
    return this.http.get(this.baseUrl + this.endpoint + track)
        .map(res => {
          if(res.status != 200) throw new Error();
          return res.json();
        });
  }
}
