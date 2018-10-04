import { Component, OnInit, Inject } from '@angular/core';
import {FormControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { AuthService } from '../services/auth.service';
import { PrescriptionService } from '../services/prescription.service';

import { Prescription } from '../interfaces/clinic.interface';


@Component({
  selector: 'tsel-prescription',
  templateUrl: './prescription.component.html',
  styleUrls: ['./prescription.component.scss']
})
export class PrescriptionComponent implements OnInit {
  modalTitle: string;
  appointmentID: number;
  doctorID: string;
  prescriptionID: string;
  prescriptionForm: FormGroup;

  constructor( @Inject( MAT_DIALOG_DATA ) public data: any, private  dialogRef: MatDialogRef<PrescriptionComponent>, private formBuilder: FormBuilder, private authService: AuthService, private prescriptionService: PrescriptionService ) { 
    this.doctorID = authService.doctorID;
    this.modalTitle = data.title;
    this.appointmentID = data.appointmentID;
    this.prescriptionID = data.id
    console.log(data);
   }

  ngOnInit() {
    this.prescriptionForm = this.formBuilder.group({
      name:        [ '', Validators.required ],
      whatIsFor:   [ '', Validators.required ],
      duration:    [ '', Validators.required ],
      timing:      [ '', Validators.required ],
      appointment: [ this.appointmentID, Validators.required ],
    })
  }


  savePrescription() {
    let prescriptionJSON = {
      name: this.prescriptionForm.controls['name'].value,
      whatIsFor: this.prescriptionForm.controls['whatIsFor'].value,
      duration: this.prescriptionForm.controls['duration'].value,
      timing: this.prescriptionForm.controls['timing'].value,
      appointment: this.appointmentID
    }
    console.log( prescriptionJSON );
    if( this.prescriptionID !== ""){
      this.prescriptionService.update( this.prescriptionID, prescriptionJSON )
      .subscribe(
        res => {             
          console.log( res );
          this.dialogRef.close();
        },
        error => {                    
          console.log( error );
          this.dialogRef.close();
        }
      )
    }else {
      this.prescriptionService.save( prescriptionJSON )
      .subscribe(
        res => {             
          console.log( res );
          this.dialogRef.close();
        },
        error => {                    
          console.log( error );
          this.dialogRef.close();
        }
      )
    }
  }

}