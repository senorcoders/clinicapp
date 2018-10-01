import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { Router } from '@angular/router';

import { UploadAvatarComponent } from '../upload-avatar/upload-avatar.component';
import { ContactComponent } from '../contact/contact.component';
import { BasicInfoComponent } from './basic-info/basic-info.component';
import { DoctorServicesComponent } from './doctor-services/doctor-services.component';
import { SchoolingComponent } from '../schooling/schooling.component';

import { AuthService } from '../services/auth.service';
import { DoctorService } from '../services/doctor.service'
import { ContactService } from '../services/contact.service';
import { DoctorServicesService } from '../services/doctor-services.service';
import { SchoolingService } from '../services/schooling.service';


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
  

  constructor( public dialog: MatDialog, private authService: AuthService, private router: Router, private schoolingService: SchoolingService, private doctorService: DoctorService, private contactService: ContactService, private services: DoctorServicesService ) { 
    this.doctorID = authService.doctorID;
    this.doctorAvatar = `${environment.base_api}/users/avatar/${this.doctorID}?`+ new Date().getTime();
    this.doctorService.getDoctorInfo().subscribe( result => {
      this.doctorInfo =  result ;
      console.log(this.doctorInfo);
    } )
  }

  ngOnInit() {
    this.doctorService.getDoctorInfo().subscribe( result => {
      this.doctorInfo =  result ;
      console.log(this.doctorInfo);
    } )
  }


  openAvatarModal() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
    id: this.doctorID,
    title: 'Actualizar foto de perfil'
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
      title: 'Informacion de Contacto',
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

  refreshBasicInfo(){
    this.doctorService.getDoctorInfo().subscribe( result => {
      this.doctorInfo.info = [];
      this.doctorInfo.info =  result.info ;
      console.log(this.doctorInfo);
    } )
  }

  refreshServiceInfo(){
    this.doctorService.getDoctorInfo().subscribe( result => {
      this.doctorInfo.services = [];
      this.doctorInfo.services =  result.services ;
      console.log(this.doctorInfo);
    } )
  }

  openBasicModal( id, name, email, notes ) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: id,      
      title: 'Informacion Basica',
      name: name,
      email: email,
      notes: notes
    };
  
    const dialogRef = this.dialog.open( BasicInfoComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      console.log(" Dialog was closed ")
      console.log(result)
      this.refreshBasicInfo()
    });
  }

  openServicesModal( id, serviceImage, name, price ) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: id,      
      title: 'Servicios',
      name: name,
      price: price,
      imageURL: serviceImage,      
      user: this.doctorID
    };
  
    const dialogRef = this.dialog.open( DoctorServicesComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      console.log(" Dialog was closed ");
      console.log(result);
      this.refreshServiceInfo();
    });
  }

  deleteService( service_id: string ) {    
    this.services.delete( service_id )
      .subscribe( data => {
        console.log( 'contacto eliminado' );
        console.log( data );
        this.refreshServiceInfo();
      } )
  }

  deleteSchooling( schooling_id: string) {
    this.schoolingService.delete( schooling_id )
      .subscribe( data => {
        this.refreshSchoolingInfo();
      } )
  }

  openSchoolingModal( id, schoolingImage, name, school, year ) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: id,            
      title: name,
      school: school,
      year: year,
      imageURL: schoolingImage,
      user: this.doctorID
    };
  
    const dialogRef = this.dialog.open( SchoolingComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      console.log(" Dialog was closed ");
      console.log(result);
      this.refreshSchoolingInfo();
    });
  }

  refreshSchoolingInfo(){
    this.doctorService.getDoctorInfo().subscribe( result => {
      this.doctorInfo.schooling = [];
      this.doctorInfo.schooling =  result.schooling ;
      console.log(this.doctorInfo);
    } )
  }

}
