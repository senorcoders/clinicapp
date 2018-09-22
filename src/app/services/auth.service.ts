import { Injectable } from '@angular/core';
import { RequestOptions, Response } from '@angular/http';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  API_URL = 'http://localhost:7002/v1.0';
  TOKEN_KEY = 'token';
  DOCTOR_ID = 'doctor_id';

  constructor( private http: HttpClient, private router: Router ) { }
  get token() {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  get doctorID() {
      return localStorage.getItem(this.DOCTOR_ID);
  }

  get isAuthenticated() {
      return !!localStorage.getItem(this.TOKEN_KEY);
  }

  logout() {
      localStorage.removeItem(this.TOKEN_KEY);
      localStorage.removeItem(this.DOCTOR_ID);
      this.router.navigateByUrl('/');
  }

  login(email: string, pass: string) {
      const headers = {
          headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };

      const data = {
          email: email,
          password: pass
      };

      this.http.post(this.API_URL + '/account/login', data, headers).subscribe(
          (res: any) => {
              console.log(res);
              localStorage.setItem(this.DOCTOR_ID, res.user._id);
              localStorage.setItem(this.TOKEN_KEY, res.token);
              this.router.navigateByUrl('/profile');            
          },
          (err: any) => {
              alert(err.error.message);              
          } 
      );
  }

  getAccount() {
      return this.http.get(this.API_URL + '/profile');
  }
}
