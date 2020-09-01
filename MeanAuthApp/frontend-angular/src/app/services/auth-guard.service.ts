import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
 
@Injectable()
export class AuthGuardService implements CanActivate {
 
  constructor(private authorizor: AuthService, private router: Router) {}
 
  canActivate() {
    if(this.authorizor.loggedIn()) {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
}
