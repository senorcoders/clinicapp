import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import * as moment from 'moment';
import { Router } from '@angular/router';

@Component({
  selector: 'tsel-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  opened: boolean = true;
  title = 'angular-bootstrap';
  loggedIn: boolean = false;

  constructor( private authService: AuthService, private router: Router) {    
    if( authService.isAuthenticated ){
      this.loggedIn = true;
      //this.router.navigate(['/profile']);
    } else {
      this.loggedIn = false;
      this.router.navigate(['/']);
    }
  }
  isLogged(){
    return this.authService.isAuthenticated;
  }
  
}
