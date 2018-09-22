import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { UploadAvatarComponent } from '../upload-avatar/upload-avatar.component';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { DoctorService } from '../services/doctor.service'
import { environment } from '../../environments/environment';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'}
];

@Component({
  selector: 'tsel-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource: PeriodicElement[];
  doctorID: string;
  doctorAvatar: string;
  

  constructor( public dialog: MatDialog, private authService: AuthService, private router: Router, private doctorService: DoctorService ) { 
    this.doctorID = authService.doctorID;
    this.doctorAvatar = `${environment.base_api}/users/avatar/${this.doctorID}?`+ new Date().getTime();
    doctorService.getDoctorInfo().subscribe( result => {
      console.log( result );
    } )
  }

  ngOnInit() {
    
  }
  openModal() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
    id: '5ba0357ce01ba104ac9ea7a6',
    title: 'Update Avatar Image'
    };
   const dialogRef = this.dialog.open(UploadAvatarComponent, dialogConfig);
   dialogRef.afterClosed().subscribe(result => {
    console.log(" Dialog was closed ")
    console.log(result)
     //document.querySelector(".doctorAvatar").src=`${environment.base_api}/users/avatar/${this.doctorID}?`+ new Date().getTime();
     this.doctorAvatar = `${environment.base_api}/users/avatar/${this.doctorID}?`+ new Date().getTime();
   });
  }
}
