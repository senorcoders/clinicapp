import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CanActivateViaAuthGuardService implements CanActivate {

  constructor( private authService: AuthService ) { }

  canActivate() {
    return this.authService.isAuthenticated;
  }
}
