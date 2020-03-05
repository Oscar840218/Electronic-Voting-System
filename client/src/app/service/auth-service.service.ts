import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  readonly domain = 'http://localhost:8080/user'
  authToken;
  user;
  options;

  constructor(private http: Http) { }

  createAuthenticationHeaders() {
    this.loadToken();
    this.options = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json',
        'authorization': this.authToken
      })
    })
  }

  loadToken() {
    this.authToken = localStorage.getItem('token');
  }

  registerUser(user) {
    return this.http.post(this.domain + '/register', user);
  }
}
