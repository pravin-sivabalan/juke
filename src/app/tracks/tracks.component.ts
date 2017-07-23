import { Component, OnInit } from '@angular/core';
import { TrackService } from '../shared/services/track.service';
import { Track } from '../shared/model/track';
import io from 'socket.io-client';

@Component({
  selector: 'tracks',
  templateUrl: './tracks.component.html',
  styleUrls: ['./tracks.component.css'],
  providers: [TrackService]
})
export class TracksComponent implements OnInit {
  tracks: Track[];

  constructor(private trackService: TrackService) {
    const socket = io('localhost:3000');
    socket.on('track', this.newTrack);
    socket.on('vote', this.newVote);
  }

  ngOnInit() {
    this.getTracks();
  }

  getTracks() {
    this.trackService.getTracks().subscribe(
      (tracks: Track[]) => {
        this.tracks = tracks;
        console.log(this.tracks);
      },
      (err: Error) => {
        console.log(err);
      }
    )
  }

  newTrack(track: Track) {
    this.tracks.push(track);
  }

  newVote(data: any) {
    for(let i = 0; i < this.tracks.length; i++) {
      if(this.tracks[i]._id == data._id) {
        this.tracks[i].votes = data.votes;
      }
    }
  }

  upVote(track: Track) {
    if(track.upVoted) return;
    if(track.isLoading) return;
    track.isLoading = true;
    this.trackService.upVoteTrack(track._id).subscribe(
      (data) => {
        track.votes = data.votes;
        track.upVoted = true;
        track.downVoted = false;
        track.isLoading = false;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  downVote(track: Track) {
    if(track.downVoted) return;
    if(track.votes == 0) return;
    if(track.isLoading) return;
    track.isLoading = true;
    this.trackService.downVoteTrack(track._id).subscribe(
      (data) => {
        track.votes = data.votes;
        track.downVoted = true;
        track.upVoted = false;
        track.isLoading = false;
      },
      (err) => {
        console.log(err);
      }
    );
  }

}
