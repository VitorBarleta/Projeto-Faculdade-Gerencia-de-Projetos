import { Injectable } from '@angular/core';
import { User } from './user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userAuthenticated: boolean = false;

  constructor(private router: Router) { }

  doLogin(user: User): any {

    if(user.user && user.password){
      this.userAuthenticated = true;
      this.router.navigate(['apps/home']);
    }
  }

  userIsAuthenticated(): any {
    return this.userAuthenticated;
  }
}
