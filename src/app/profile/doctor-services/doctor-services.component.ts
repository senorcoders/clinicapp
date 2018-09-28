import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import { AuthService } from '../../services/auth.service';
import { environment } from '../../../environments/environment';

import { DoctorServicesService } from '../../services/doctor-services.service';

@Component({
  selector: 'tsel-doctor-services',
  templateUrl: './doctor-services.component.html',
  styleUrls: ['./doctor-services.component.scss']
})


export class DoctorServicesComponent implements OnInit {
  modalTitle: string;
  selectedFile: File = null;
  id: string = '';
  doctorID: string;
  name: string;
  price: string;
  user: string;
  imageURL: string;
  addServiceForm: FormGroup;

  constructor( @Inject( MAT_DIALOG_DATA ) public data: any, private formBuilder: FormBuilder, private http: HttpClient, private authservice: AuthService, private doctorService: DoctorServicesService ) { 
    this.modalTitle = data.title;    
    this.doctorID = authservice.doctorID;
    this.name = data.name;
    this.price = data.price;
    this.imageURL = data.imageURL;
    this.user = data.user;
    this.id = data.id;
    console.log(data);
  }

  ngOnInit() {
    this.addServiceForm = this.formBuilder.group( {      
      name: [ this.name, Validators.required ],
      price: [ this.price, Validators.required ],
      user: [this.user, Validators.required ]
    } )
  }
  onFileSelected( event ){
    console.log( event );
    this.selectedFile = event.target.files[0];
  }
  onUpload( service_id: string ) {    
    const fd = new FormData();
    fd.append('serviceImage', this.selectedFile);
    this.http.post(`${environment.base_api}/services/${service_id}/image`, fd)
      .subscribe( res => {
          console.log( res );
      } )
  }

  saveService() {
    if( this.id == null ) {
      this.doctorService.save( this.addServiceForm.value )
      .subscribe( data => {
        console.log( data );
        if( this.selectedFile !== null ) {
          if( data.hasOwnProperty('id') ){
            this.onUpload( data.id )
          }
        }        
      } )
    }else {
      this.doctorService.update( this.id, this.addServiceForm.value )
      .subscribe( data => {
        console.log( data );
        if( this.selectedFile !== null ) {
          if( data.hasOwnProperty('id') ){
            this.onUpload( data.id )
          }
        }                
      } )      
    }    
  }
}
