import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../categories.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'tsel-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  public categories = [];
  public doctorNavigation = [
    {
      name: "Profile",
      path: "/profile",
      icon: ""
    },
    {
      name: "Appointments",
      path: "/appointments",
      icon: ""
    },
    {
      name: "Patients",
      path: "/patients",
      icon: ""
    },
    {
      name: "Calendar",
      path: "/calendar",
      icon: ""
    }
  ]
  constructor(private _categoryService: CategoriesService, private authService: AuthService) {
    if( this.authService.isAuthenticated ){
      this.authService.getAccount();
    }
   }
  
  ngOnInit() {
    this._categoryService.getCategories()
    .subscribe( data => this.categories = data );
    
  }

  logout() {
    this.authService.logout();
  }

}
