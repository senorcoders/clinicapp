import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor( public snackBar: MatSnackBar ) { }

  showMessage( message:string ) {
    this.snackBar.open( message, '' ,{
        duration: 2000,
        verticalPosition : 'top',
        horizontalPosition : 'right'
      });
  }
}
