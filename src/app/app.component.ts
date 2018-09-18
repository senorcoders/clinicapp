import { Component } from '@angular/core';


@Component({
  selector: 'tsel-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  opened: boolean = true;
  title = 'angular-bootstrap';
}
