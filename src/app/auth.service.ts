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

  constructor( private http: HttpClient, private router: Router ) { }
  get token() {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  get isAuthenticated() {
      return !!localStorage.getItem(this.TOKEN_KEY);
  }

  logout() {
      localStorage.removeItem(this.TOKEN_KEY);
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
              localStorage.setItem(this.TOKEN_KEY, res.token);
              this.router.navigateByUrl('/profile');            
          }
      );
  }

  getAccount() {
      return this.http.get(this.API_URL + '/profile');
  }
}
