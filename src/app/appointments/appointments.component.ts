import { Component, OnInit } from '@angular/core';
import {FormControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { MatDialog, MatDialogConfig } from '@angular/material';

import { PrescriptionComponent } from '../prescription/prescription.component';
import { CheckupsComponent } from '../checkups/checkups.component';

import { AuthService } from '../services/auth.service';
import { DoctorService } from '../services/doctor.service';
import { PatientsService } from '../services/patients.service';
import { AppointmentService } from '../services/appointment.service';
import { PrescriptionService } from '../services/prescription.service';

import * as moment from 'moment';

import { Patient } from '../interfaces/clinic.interface';

export interface State {
  flag: string;
  name: string;
  population: string;
}

export interface HistoryElement {
  adate: string;
  reason: string;
  notes: string;
}

const ELEMENT_DATA: HistoryElement[] = [
  {adate: "May 18th, 2018", reason: 'High Fever', notes: 'paracetamol 8 times a day'},
  {adate: "May 12th, 2018", reason: 'High Fever', notes: 'paracetamol 8 times a day'},
  {adate: "May 01th, 2018", reason: 'High Fever', notes: 'paracetamol 8 times a day'},
  {adate: "Apr 15th, 2018", reason: 'High Fever', notes: 'paracetamol 8 times a day'},
  {adate: "Feb 08th, 2018", reason: 'High Fever', notes: 'paracetamol 8 times a day'}
];

@Component({
  selector: 'tsel-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss']
})
export class AppointmentsComponent implements OnInit {
  doctorID:            string;
  patientList:         Patient[] = [];
  currentAppointment:  string;
  selectedPatient:     any;
  displayedColumns:    string[] = ['adate', 'reason', 'notes'];
  patientHistory:      any[];
  appointmentForm:     FormGroup;
  currentPrescription: any[];


  dataSource = ELEMENT_DATA;

  stateCtrl = new FormControl();
  filteredStates: Observable<Patient[]>;

  states: State[] = [
    {
      name: 'Arkansas',
      population: '2.978M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Arkansas.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Flag_of_Arkansas.svg'
    },
    {
      name: 'California',
      population: '39.14M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_California.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/0/01/Flag_of_California.svg'
    },
    {
      name: 'Florida',
      population: '20.27M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Florida.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Florida.svg'
    },
    {
      name: 'Texas',
      population: '27.47M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Texas.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Texas.svg'
    }
  ];  

  constructor(  public dialog: MatDialog, private doctorService: DoctorService, private patientService: PatientsService, private authService: AuthService, private formBuilder: FormBuilder, private appointmentService: AppointmentService, private prescriptionService: PrescriptionService ) { 
    this.doctorID = authService.doctorID; 
    this.selectedPatient = {
      id: '',
      name: '',
      email: '',
      phone: '',
      notes: '',
      avatarURL: ''
    }
    
    this.getMyPatients();
    console.log(this.patientList);
    console.log(this.filteredStates);
    this.filteredStates = this.stateCtrl.valueChanges    
    .pipe(
      startWith(''),
      map(patient => patient ? this._filterStates(patient) : this.patientList.slice())
    );
    this.currentAppointment = '';
   }

  ngOnInit() {
    
    this.stateCtrl.valueChanges.subscribe( patient => {//on select a patient
      console.log( patient.id );
      this.appointmentForm.controls['patient'].setValue( patient.id );
      this.selectedPatient.id = patient.id;
      this.getPatientInfo( patient.id  );
      this.getHistory( );
    } );

    this.appointmentForm = this.formBuilder.group( {      
        datetime: [ '', Validators.required ],
        height: [ '', Validators.required ],
        weight: [ '', Validators.required ],
        reason: [ '', Validators.required ],            
        notes: [ '', Validators.required ],
        doctor: [this.doctorID, Validators.required ],
        patient: [this.selectedPatient.id, Validators.required ] 
      } )
  }
  
  
  getMyPatients(){
    this.filteredStates = this.doctorService.getMyAsyncPatients( this.doctorID );
    this.doctorService.getMyPatients( this.doctorID )
    .subscribe( 
      res => {        
         res.map( patient => {
          delete patient.avatarURL;
          var yearsOld = moment().diff( patient.birthday , 'years');
          patient.birthday = `${yearsOld} years old`;
          this.patientList.push( {
            id: patient.id,
            name: patient.name,
            birthday: patient.birthday
          } as Patient )          
          return patient;
        } )
        this._filterStates('');
      },
      error => {
        console.log(error);
      }
    )
  }

  getPatientInfo( patientID:string ) {       
    this.patientService.getPatient( patientID )
    .subscribe( patient => {
      console.info( patient ); 
      if( patient[0] !== undefined ){
        this.selectedPatient.id        = patient[0].id;
        this.selectedPatient.name      = patient[0].name;
        this.selectedPatient.email     = patient[0].email;
        this.selectedPatient.phone     = patient[0].phone;
        this.selectedPatient.notes     = patient[0].notes;
        var years_old = moment().diff( patient[0].birthday , 'years');
        this.selectedPatient.birthday  = `${years_old} años`;
        this.selectedPatient.avatarURL = patient[0].avatarURL
        var patientSelected: HTMLElement = document.querySelector('.onlyWhenSelected');
        patientSelected.style.display = 'flex';
        var historyDiv: HTMLElement = document.querySelector('.historyContainer');
        historyDiv.style.display = 'flex';
      }
      
      
    }  )
  }
  
  displayFn(patient?: Patient): string | undefined {    
    
    if( patient !== undefined ){
      this.selectedPatient = patient;      
    }
    
    return patient ? `${patient.name} - ${patient.birthday} `  : undefined;
  }

  private _filterStates(value: string): Patient[] {
    const filterValue = value.toString().toLowerCase();

    return this.patientList.filter(patient => patient.name.toLowerCase().indexOf(filterValue) === 0);
  }

  saveAppointment() {
    
    var newAppointment = {
      weight:  this.appointmentForm.controls['weight'].value,
      height:  this.appointmentForm.controls['height'].value,
      reason:  this.appointmentForm.controls['reason'].value,
      notes:   this.appointmentForm.controls['notes'].value,
      doctor:  this.appointmentForm.controls['doctor'].value,
      patient: this.appointmentForm.controls['patient'].value,
    }
    if( this.currentAppointment !== ""){
      this.appointmentService.update( this.currentAppointment, newAppointment )
      .subscribe(
        res => {             
          if( res.hasOwnProperty("id") ){
            this.currentAppointment = res.id;
            this.getHistory();
          }       
        },
        error => {                    
          console.log( error );
        }
      )
    }else {
      this.appointmentService.save( newAppointment )
      .subscribe(
        res => {             
          if( res.hasOwnProperty("id") ){
            this.currentAppointment = res.id;
          }       
        },
        error => {                    
          console.log( error );
        }
      )
    }
    
    

  }

  getHistory(){
    this.appointmentService.getHistory( this.selectedPatient.id, this.doctorID )
    .subscribe(
      res => {
        this.patientHistory = res;
      },
      error => {
        console.log( error );
      }
    )
  }

  selectHistory( historyID:string ) {
    this.appointmentService.getAppointment( historyID )
    .subscribe( 
      res => {
        this.currentAppointment = res.id;
        this.appointmentForm.controls['weight'].setValue( res.weight );
        this.appointmentForm.controls['height'].setValue( res.height );
        this.appointmentForm.controls['notes'].setValue( res.notes );
        this.appointmentForm.controls['reason'].setValue( res.reason );
        
        this.getPrescription();
      },
      error => {
        console.log( error );
      }
     )
     
  }

  openPrescriptionModal() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: '',
      appointmentID: this.currentAppointment,
      title: 'Receta'
    };
    const dialogRef = this.dialog.open(PrescriptionComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      console.log(" Dialog was closed ")
      console.log(result)
    });
  }

  getPrescription() {
    this.prescriptionService.get( this.currentAppointment )
    .subscribe(
      res => {
        this.currentPrescription = res;
      },
      error => {
        console.log( error );
      }
    )
  }

  openCheckupsModal() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: '5ba0357ce01ba104ac9ea7a6',
      title: 'Checkups'
    };
    const dialogRef = this.dialog.open(CheckupsComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      console.log(" Dialog was closed ")
      console.log(result)
    });
  }

  

}
