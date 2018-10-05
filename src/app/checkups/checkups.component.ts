import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import { AuthService } from '../services/auth.service';
import { environment } from '../../environments/environment';

import { CheckupsService } from '../services/checkups.service';

@Component({
  selector: 'tsel-checkups',
  templateUrl: './checkups.component.html',
  styleUrls: ['./checkups.component.scss']
})
export class CheckupsComponent implements OnInit {
  modalTitle:     string;
  id:             string;
  doctorID:       string;
  appointmentID:  string;
  reason:         string;
  note:          string;
  imageURL:       string;
  addCheckupForm: FormGroup;
  selectedFile:   File;

  constructor( @Inject( MAT_DIALOG_DATA ) public data: any, private  dialogRef: MatDialogRef<CheckupsComponent>, private http: HttpClient, private authservice: AuthService, private formBuilder: FormBuilder, private checkupService: CheckupsService ) { 
    this.modalTitle     = data.title;
    this.id             = data.id;
    this.reason         = data.reason;
    this.note          = data.note;
    this.appointmentID  = data.appointmentID;
    this.doctorID       = authservice.doctorID;
    console.log(data);
    console.log(this.appointmentID);
  }

  ngOnInit() {
    this.addCheckupForm = this.formBuilder.group( {
      reason: [ this.reason, Validators.required ],
      note:  [ this.note, Validators.required ],
      appointment: [ this.appointmentID, Validators.required ]
    } )
  }

  onFileSelected( event ){
    console.log( event );
    this.selectedFile = event.target.files[0];
  }

  onUpload( checkup_id: string ) {    
    const fd = new FormData();
    fd.append('checkupImage', this.selectedFile);
    this.http.post(`${environment.base_api}/checkups/${checkup_id}/image`, fd)
      .subscribe( 
        res => {
          console.log( res );
          this.dialogRef.close();
        },
        error => {
          this.dialogRef.close();
        }
      )
  }


  saveCheckup() {
    if( this.id == null || this.id == '' ) {
      this.checkupService.save( this.addCheckupForm.value )
      .subscribe( data => {
       
        console.log('lol');
        console.log( data );
        console.log( this.selectedFile );
        if( this.selectedFile !== null && this.selectedFile !== undefined ) {
          if( data.hasOwnProperty('id') ){
            this.onUpload( data.id )
          }else{
            this.dialogRef.close();
          }
        } else {
          this.dialogRef.close();
        }
      } )
    }else {
      this.checkupService.update( this.id, this.addCheckupForm.value )
      .subscribe( data => {
        console.log( data );
        console.log( this.selectedFile );
        if( this.selectedFile !== null && this.selectedFile !== undefined ) {
          if( data.hasOwnProperty('id') ){
            this.onUpload( data.id )
          }else{
            this.dialogRef.close();
          }
        }else{
          this.dialogRef.close();
        }
      } )      
    }    
  }
}
