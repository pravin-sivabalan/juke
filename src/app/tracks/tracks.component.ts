import { Component, OnInit } from '@angular/core';
import { TrackService } from '../shared/services/track.service';
import { PlayerService } from '../shared/services/player.service';
import { Track } from '../shared/model/track';
import io from 'socket.io-client';

@Component({
  selector: 'tracks',
  templateUrl: './tracks.component.html',
  styleUrls: ['./tracks.component.css'],
  providers: [TrackService, PlayerService]
})
export class TracksComponent implements OnInit {
  tracks: Track[];

  constructor(private trackService: TrackService, private playerService: PlayerService) {
    const socket = io('localhost:3000');
    socket.on('add track', (track: Track) => {
      this.newTrack(track);
    });
    socket.on('delete track', (trackId: string) => {
      this.deleteTrack(trackId);
    });
    socket.on('vote', (data) => {
      this.newVote(data);
    });
  }

  ngOnInit() {
    this.getTracks();
  }

  getTracks() {
    this.trackService.getTracks().subscribe(
      (tracks: Track[]) => {
        this.tracks = tracks;
        // TODO: add sorting to backend
        this.sort();
      },
      (err: Error) => {
        console.log(err);
      }
    )
  }

  newTrack(track: Track) {
    this.tracks.push(track);
  }

  deleteTrack(trackId: string) {
    for(let i = 0; i < this.tracks.length; i++) {
      if(trackId === this.tracks[i]._id) {
        return this.tracks.splice(i, 1);
      }
    }
  }

  newVote(data: any) {
    for(let i = 0; i < this.tracks.length; i++) {
      if(this.tracks[i]._id == data._id) {
        this.tracks[i].votes = data.votes;
        return this.sort();
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
        this.sort();
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
        this.sort();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  sort() {
    for(let i = 0; i < this.tracks.length; i++) {
      for(let j = 0; j < this.tracks.length; j++) {
        if(this.tracks[i].votes > this.tracks[j].votes) {
          let temp = this.tracks[i];
          this.tracks[i] = this.tracks[j];
          this.tracks[j] = temp;
        }
      }
    }
  }

}
