import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../shared/services/player.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [PlayerService]
})
export class DashboardComponent implements OnInit {

  constructor(private playerService: PlayerService) { }

  ngOnInit() { }

  play() {
    this.playerService.play().subscribe();
  }

}
