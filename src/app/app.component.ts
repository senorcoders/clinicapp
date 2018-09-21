import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'tsel-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  opened: boolean = true;
  title = 'angular-bootstrap';
  loggedIn: boolean = false;

  constructor( private authService: AuthService) {    
    
  }
  
}
