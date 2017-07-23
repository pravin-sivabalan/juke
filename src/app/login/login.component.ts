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

  constructor(private router: Router, private authService: AuthService) {
    this.loggingIn = false;
  }

  ngOnInit() {
  }

  login() {
    this.loggingIn = true;
  }

  submit(room: string, username: string) {
    this.authService.joinRoom(room, username);
    this.router.navigate(['/dash']);
  }

}
