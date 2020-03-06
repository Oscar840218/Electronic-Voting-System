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
  role;
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

  login(resident_id) {
    return this.http.post(this.domain + '/login', resident_id).map(res => res.json());
  }

  storeUserData(token, role) {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    this.authToken = token;
  }

  loggedIn() {
    return tokenNotExpired();
  }


  logout() {
    this.authToken = null;
    this.role = null;
    localStorage.clear();
  }


}
