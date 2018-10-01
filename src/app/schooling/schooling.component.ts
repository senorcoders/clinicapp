import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import { AuthService } from '../services/auth.service';
import { environment } from '../../environments/environment';

import { SchoolingService } from '../services/schooling.service';

@Component({
  selector: 'tsel-schooling',
  templateUrl: './schooling.component.html',
  styleUrls: ['./schooling.component.scss']
})
export class SchoolingComponent implements OnInit {
  modalTitle: string;
  selectedFile: File = null;
  id: string = '';
  doctorID: string;
  title: string;
  school: string;
  year: string;
  user: string;
  imageURL: string;
  addSchoolingForm: FormGroup;

  constructor( private  dialogRef: MatDialogRef<SchoolingComponent>, @Inject( MAT_DIALOG_DATA ) public data: any, private formBuilder: FormBuilder, private http: HttpClient, private authservice: AuthService, private schoolingService: SchoolingService ) { 

    this.doctorID   = authservice.doctorID;
    this.title      = data.title;
    this.school     = data.school;
    this.year       = data.year;
    this.imageURL   = data.imageURL;
    this.user       = data.user;
    this.id         = data.id;
    console.log(data);
  }

  ngOnInit() {
    this.addSchoolingForm = this.formBuilder.group( {      
      title: [ this.title, Validators.required ],
      school: [ this.school, Validators.required ],
      year: [ this.year, Validators.required ],
      user: [this.user, Validators.required ]
    } )
  }

  onFileSelected( event ){
    console.log( event );
    this.selectedFile = event.target.files[0];
  }
  onUpload( service_id: string ) {    
    const fd = new FormData();
    fd.append('schoolingImage', this.selectedFile);
    this.http.post(`${environment.base_api}/schooling/${service_id}/image`, fd)
      .subscribe( 
        res => {
          console.log('all cool');
          console.log( res );
          this.dialogRef.close();        
        }, 
        error => {
          console.log('not  cool');
          this.dialogRef.close();
        }
        )
        
  }

  save() {
    if( this.id == null ) {
      console.log( 'save' );
      this.schoolingService.save( this.addSchoolingForm.value )
      .subscribe( data => {
        console.log( data );
        if( this.selectedFile !== null ) {
          if( data.hasOwnProperty('id') ){
            this.onUpload( data.id )            
          }else{
            this.dialogRef.close();
          }
        }        
      } )
    }else {
      console.log( 'update' );
      this.schoolingService.update( this.id, this.addSchoolingForm.value )
      .subscribe( data => {
        console.log( data );
        if( this.selectedFile !== null ) {
          if( data.hasOwnProperty('id') ){
            this.onUpload( data.id )            
          }else{
            this.dialogRef.close();
          }
        }                
      } )      
    }    
  }

}
