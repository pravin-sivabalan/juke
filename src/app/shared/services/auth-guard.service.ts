import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthGuardService {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate() {
    this.authService.isLoggedIn().subscribe(
      (res) => {
        console.log(res);
        if(res.isLoggedIn){
          // this.router.navigate(['/dash']);
          return true;
        } else {
          console.log(res.isLoggedIn);
          this.router.navigate(['/'])
          return false;
        }
      },
      (err: Error) => {
        return false;
      }
    )
  }
}
