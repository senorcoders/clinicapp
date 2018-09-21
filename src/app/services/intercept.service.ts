import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptService implements HttpInterceptor {

  constructor( private injector: Injector ) { }

  intercept(req, next) {
    const authService = this.injector.get(AuthService);
    const authRequest = req.clone({
        // tslint:disable-next-line:max-line-length
        if(authService.token){
          headers: req.headers.set('Authorization', authService.token)
        }
    });

    return next.handle(authRequest);
  }
}
