import { Component } from '@angular/core';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AuthService]
})
export class AppComponent {
  constructor(private authService: AuthService) {
    setInterval(() => {
      this.authService.refreshToken();
    }, 35 * 100 * 1000); // refresh before 3600 millisecond
  }
}
