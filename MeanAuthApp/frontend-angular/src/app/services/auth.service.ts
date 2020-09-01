import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from "rxjs/operators"; 


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authToken: any;
  user:any;
  url:string = 'http://localhost:5000'

  constructor(private http:HttpClient) { }

  registerUser(user) {

    let headers = new HttpHeaders();
    headers.append('Content-type', 'application/json');

    return this.http.post(this.url + '/users/register', user, {headers: headers});
  }

  authenticatedUser(user) {
    let headers = new HttpHeaders();
    headers.append('Content-type', 'application/json');

    return this.http.post(this.url + '/users/authenticate', user, {headers: headers});
  }

  storeUserData(token, user) {

    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  logout() {

    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  isUserLoggedIn() {
    if(this.authToken != null) {
      return true;
    }
    else {
      return false;
    }
  }

  getProfile() {

    this.loadToken();
    const headers = new HttpHeaders({ 
      'Content-Type': 'application/json', 
      'Authorization': this.authToken 
    }); 

    return this.http.get(this.url + '/users/profile', {headers: headers});
  }

  loadToken() {
    
    const token = localStorage.getItem('id_token');
    this.authToken = token;

  }
  
}
