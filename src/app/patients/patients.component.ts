import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { environment } from '../../environments/environment';

import { DoctorService } from '../services/doctor.service';
import { PatientsService } from '../services/patients.service';

import { AddPatientComponent } from './add-patient/add-patient.component';

import { UploadAvatarComponent } from '../upload-avatar/upload-avatar.component';

@Component({
  selector: 'tsel-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss']
})
export class PatientsComponent implements OnInit {
  doctorID: string;
  patientsList: any;
  selectedPatient: string;
  patientInfo: any;

  constructor( public dialog: MatDialog, private authService: AuthService, private router: Router, private doctorService: DoctorService, private patientService: PatientsService ) {
    this.doctorID = authService.doctorID;
    this.patientInfo = {
      name:'',
      avatarURL:'',
      email: '',
      notes: ''
    }
  }

  ngOnInit() {
    this.getPatienList();
  }

  getPatienList() {
    this.doctorService.getMyPatients( this.doctorID ).subscribe( result => {
      this.patientsList =  result ;      
    } )
  }

  openAddPatientModal() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
    id: this.doctorID,
    title: 'Create Patient'
    };
   const dialogRef = this.dialog.open(AddPatientComponent, dialogConfig);
   dialogRef.afterClosed().subscribe(result => {
    console.log(" Dialog was closed ")
    console.log(result)
     //document.querySelector(".doctorAvatar").src=`${environment.base_api}/users/avatar/${this.doctorID}?`+ new Date().getTime();
     //this.doctorAvatar = `${environment.base_api}/users/avatar/${this.doctorID}?`+ new Date().getTime();
     this.getPatienList();
   });
  }

  selectPatient( patientID ) {
    this.selectedPatient = patientID;
    this.patientService.getPatient( patientID )
    .subscribe( patient => {
      console.info( patient[0] );
      this.patientInfo = patient[0];
    }  )
  }

  openAvatarModal() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
    id: this.selectedPatient,
    title: 'Upload Patient Image'
    };
   const dialogRef = this.dialog.open( UploadAvatarComponent , dialogConfig );
   dialogRef.afterClosed().subscribe(result => {
    console.log(" Dialog was closed ")
    console.log(result)
     //document.querySelector(".doctorAvatar").src=`${environment.base_api}/users/avatar/${this.doctorID}?`+ new Date().getTime();
     //this.doctorAvatar = `${environment.base_api}/users/avatar/${this.doctorID}?`+ new Date().getTime();
    this.getPatienList();
   });
  }

}
