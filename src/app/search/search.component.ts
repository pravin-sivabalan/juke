import { Component, OnInit } from '@angular/core';
import { Track } from '../shared/model/track';
import { Subject } from 'rxjs/Subject';
import { FormControl } from '@angular/forms';
import { SpotifyService } from '../shared/services/spotify.service';
import { AuthService } from '../shared/services/auth.service';
import { TrackService } from '../shared/services/track.service';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [SpotifyService, AuthService, TrackService]
})
export class SearchComponent implements OnInit {
  results;
  searchTerm$ = new Subject<string>();

  constructor(private spotifyService: SpotifyService, private trackService: TrackService, private authService: AuthService) {
    authService.refreshToken();
  }

  ngOnInit() {
    this.spotifyService.search(this.searchTerm$)
     .subscribe(
       (results) => {
         this.results = results['tracks']['items'];
       },
       (err) => {
         this.results = [];
       }
     );
  }

  postTrack(track: any) {
    const newTrack: Track = {
      uri: track.uri,
      duration: track.duration_ms,
      title: track.name,
      artist: track.artists[0].name,
      albumName: track.album.name,
      albumArt: track.album.images[0].url
    }
    this.trackService.postTrack(newTrack).subscribe();
  }

  isExplicit(explicit: boolean): string {
    if(explicit) {
      return '(Explicit)'
    } else {
      return ''
    }
  }
}
