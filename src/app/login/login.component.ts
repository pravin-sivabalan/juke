import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {
  loggingIn: boolean;
  isCreating: boolean;
  isJoining: boolean;

  constructor(private router: Router, private authService: AuthService) {
    this.loggingIn = false;
  }

  ngOnInit() {
  }

  login(action: string) {
    this.loggingIn = true;
    if(action == 'join') {
      this.isJoining = true;
    } else if(action == 'create') {
      this.isCreating = true;
    }
  }

  submit(room: string, username: string) {
    if(this.isJoining) {
      this.authService.joinRoom(room, username);
      this.router.navigate(['/dash']);
    } else if(this.isCreating) {
      window.location.href='/api/auth/create?room=' + room + '&username=' + username;
    }
  }

}
