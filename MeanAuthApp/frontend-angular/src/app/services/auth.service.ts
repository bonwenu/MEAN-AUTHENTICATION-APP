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
  
}
