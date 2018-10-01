import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

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
  updatePatientForm: FormGroup;  
  name:string = '';

  constructor( public dialog: MatDialog, private formBuilder: FormBuilder, private authService: AuthService, private router: Router, private doctorService: DoctorService, private patientService: PatientsService ) {
    this.doctorID = authService.doctorID;
    this.patientInfo = {
      name:'',
      avatarURL:'',
      email: '',
      notes: ''
    }
  }

  ngOnInit() {
    this.updatePatientForm = this.formBuilder.group( {      
      name: [ this.name, Validators.required ],
      birthday: [ '', Validators.required ],
      email: [ '', Validators.required ],
      phone: [ '', Validators.required ],            
      notes: [ '', Validators.required ],
      user: [ '', Validators.required ]
    } )
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

  refreshPatientInfo( patientID ){
    this.patientService.getPatient( patientID )
    .subscribe( patient => {
      console.info( patient[0] );
      this.patientInfo = patient[0];
      this.name = patient[0].name;
      this.updatePatientForm.controls['name'].patchValue(patient[0].name);
      this.updatePatientForm.controls['email'].patchValue(patient[0].email);
      this.updatePatientForm.controls['birthday'].patchValue(patient[0].birthday);
      this.updatePatientForm.controls['phone'].patchValue(patient[0].phone);      
      this.updatePatientForm.controls['notes'].patchValue(patient[0].notes);
    }  )
  }

  selectPatient( patientID ) {
    var noSelected = document.querySelector('.patient-no-selected') as HTMLElement;
    noSelected.style.display = 'none';
    var patientSelected = document.querySelector('.patient-info') as HTMLElement;
    patientSelected.style.display = 'grid';

    this.selectedPatient = patientID;
    this.refreshPatientInfo( patientID );
  }

  openAvatarModal() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
    id: this.selectedPatient,
    title: 'Actualizar Imagen del Paciente'
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

  actualizarInfo() {
    console.log( 'a punto de actualizar' );
    var newinfo = {
      name: this.updatePatientForm.controls['name'].value,
      phone: this.updatePatientForm.controls['phone'].value,
      birthday: this.updatePatientForm.controls['birthday'].value,
      notes: this.updatePatientForm.controls['notes'].value,
      email: this.updatePatientForm.controls['email'].value
    }
    console.log(newinfo);
    this.patientService.update( this.selectedPatient, newinfo )
      .subscribe(
        res => {
          this.refreshPatientInfo( this.selectedPatient );
          console.log( res );
        },
        error => {
          this.refreshPatientInfo( this.selectedPatient );
          console.log( error );
        }
      )
  }
}