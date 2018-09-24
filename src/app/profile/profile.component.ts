import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { Router } from '@angular/router';

import { UploadAvatarComponent } from '../upload-avatar/upload-avatar.component';
import { ContactComponent } from '../contact/contact.component';

import { AuthService } from '../services/auth.service';
import { DoctorService } from '../services/doctor.service'
import { ContactService } from '../services/contact.service';

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
  doctorInfo: any;
  

  constructor( public dialog: MatDialog, private authService: AuthService, private router: Router, private doctorService: DoctorService, private contactService: ContactService ) { 
    this.doctorID = authService.doctorID;
    this.doctorAvatar = `${environment.base_api}/users/avatar/${this.doctorID}?`+ new Date().getTime();
    this.doctorService.getDoctorInfo().subscribe( result => {
      this.doctorInfo =  result ;
      console.log(this.doctorInfo);
    } )
  }

  ngOnInit() {
    
  }


  openAvatarModal() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
    id: this.doctorID,
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

  openContactModal( contact_id, typo, value ) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: this.doctorID,
      contactID: contact_id,
      title: 'Contact Information',
      typo: typo,
      value: value
    };
  
    const dialogRef = this.dialog.open(ContactComponent, dialogConfig);
   dialogRef.afterClosed().subscribe(result => {
    console.log(" Dialog was closed ")
    console.log(result)
    this.refreshContactInfo();     
   });
  }

  deleteContact( contact_id: string ) {
    this.contactService.deleteContact( contact_id )
      .subscribe( data => {
        console.log( 'contacto eliminado' );
        console.log( data );
        this.refreshContactInfo();
      } )
  }

  refreshContactInfo(){
    this.doctorService.getDoctorInfo().subscribe( result => {
      this.doctorInfo.contact = [];
      this.doctorInfo.contact =  result.contact ;
      console.log(this.doctorInfo);
    } )
  }

}
