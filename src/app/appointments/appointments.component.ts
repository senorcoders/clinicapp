import { Component, OnInit } from '@angular/core';
import {FormControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { Gallery, GalleryRef , GalleryItem, ImageItem } from '@ngx-gallery/core';
import { Lightbox } from '@ngx-gallery/lightbox';


import { PrescriptionComponent } from '../prescription/prescription.component';
import { CheckupsComponent } from '../checkups/checkups.component';
import { EmailComponent } from '../email/email.component';

import { AuthService } from '../services/auth.service';
import { DoctorService } from '../services/doctor.service';
import { PatientsService } from '../services/patients.service';
import { AppointmentService } from '../services/appointment.service';
import { PrescriptionService } from '../services/prescription.service';
import { CheckupsService } from '../services/checkups.service';
import { SnackBarService } from '../services/snack-bar.service';

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
  currentCheckups:     any[];
  i:                   number = 0;
  galleryId = 'Examenes';
  items: GalleryItem[];

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

  constructor( private snackBar: SnackBarService, public dialog: MatDialog, private doctorService: DoctorService, private patientService: PatientsService, private authService: AuthService, private formBuilder: FormBuilder, private appointmentService: AppointmentService, private prescriptionService: PrescriptionService, private checkupService: CheckupsService, public gallery: Gallery, private lightbox: Lightbox ) { 
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
      this.items=[];
      const galleryRef: GalleryRef = this.gallery.ref(this.galleryId);

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

      const galleryRef = this.gallery.ref(this.galleryId);
      galleryRef.load(this.items);
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
            this.snackBar.showMessage("Consulta Actualizada");
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
            this.getHistory();
            this.snackBar.showMessage("Consulta Creada!!");
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
        this.getCheckups();

        /*this.snackBar.open("Hello There ", '' ,{
          duration: 3000,
          verticalPosition : 'top',
          horizontalPosition : 'right'
        });*/
        this.snackBar.showMessage("Consulta abierta");        
      },
      error => {
        console.log( error );
      }
     )
     
  }

  openPrescriptionModal( id:string, name:string, whatIsFor:string, duration:string, timing:string ) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: id,
      name: name,
      whatIsFor: whatIsFor,
      duration: duration,
      timing: timing,
      appointmentID: this.currentAppointment,
      title: 'Receta'
    };
    const dialogRef = this.dialog.open(PrescriptionComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      this.snackBar.showMessage( "Receta Guardada!!" );
      console.log(" Dialog was closed ")
      console.log(result)
      this.getPrescription();
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

  deletePrescription( id:string ) {
    this.prescriptionService.delete( id )
    .subscribe(
      res => {
        console.log( res );
        this.snackBar.showMessage( 'Receta Borrada' );
        this.getPrescription();
      },
      error => {
        console.log( error );
        this.snackBar.showMessage( "Ocurrio un error al guardar la Receta" );
      }
    )
  }

  openEmailModal( appointmentID:string, appointmentDate: string ){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: appointmentID,
      title: 'Enviar Receta y Examenes',
      patientEmail: this.selectedPatient.email ,
      subject: `Consulta del ${appointmentDate}`
    };
    const dialogRef = this.dialog.open( EmailComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      console.log(" Dialog was closed ")
      console.log(result)
      //this.snackBar.showMessage("Examen Guardado!!");
      //this.getCheckups();
    });
  }

  openCheckupsModal( id:string, reason:string, note:string ) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: id,
      reason: reason,
      note: note,
      appointmentID: this.currentAppointment,
      title: 'Examenes'      
    };
    const dialogRef = this.dialog.open(CheckupsComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      console.log(" Dialog was closed ")
      console.log(result)
      this.snackBar.showMessage("Examen Guardado!!");
      this.getCheckups();
    });
  }

  getCheckups() {
    const galleryRef: GalleryRef = this.gallery.ref(this.galleryId);
    galleryRef.reset();
    this.checkupService.get( this.currentAppointment )
    .subscribe(
      res => {
        this.currentCheckups = res;
        let galleryIndex = -1;
        res.map( checkup => {
          //this.items.push( new ImageItem({ src: checkup.imageURL, thumb: checkup.imageURL }) ) ;
          if(checkup.imageURL !== ''){
            galleryIndex += 1;
            checkup.galleryIndex = galleryIndex;
            galleryRef.addImage({
              src: checkup.imageURL,
              thumb: checkup.imageURL,
              title: checkup.notes
            });
            console.log(checkup.imageURL);

          }
        } )
      },
      error => {
        console.log( error );
      }
    )
  }

  deleteCheckup( id:string ){
    this.checkupService.delete( id )
    .subscribe(
      res => {
        console.log(res.reason);
        this.getCheckups();
        this.snackBar.showMessage( 'Examen borrado!!' );
      },
      error => {
        console.log(error);
        this.snackBar.showMessage( 'Ocurrio un error al intentar borrar el examen!!' );
      }
    )
  }

  openInFullScreen(index: number) {
    console.log(index);
    this.lightbox.open(index, this.galleryId, {
        panelClass: 'fullscreen'
    });
  }
  

}
