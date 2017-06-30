import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { SearchService } from './search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [ SearchService ]
})
export class SearchComponent implements OnInit {
  results: Object;
  searchTerm$ = new Subject<string>();

  constructor(private searchService: SearchService) {
    this.searchService.search(this.searchTerm$)
      .subscribe(
        (results) => {
          this.results = results['tracks']['items'];
        },
        (err) => {
          this.results = [];
        }
      );
  }

  ngOnInit() {
  }

  postTrack(){
    console.log("I need to post a track");
  }

}
