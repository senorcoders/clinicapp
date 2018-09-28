import { Component, OnInit, Inject } from '@angular/core';
import {Router} from "@angular/router";
import { MAT_DIALOG_DATA } from '@angular/material';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import { AuthService } from '../../services/auth.service';
import { ContactService } from '../../services/contact.service';
import { PatientsService } from '../../services/patients.service';

export interface Patient {
  id: string;
  name: string;
  birthday: string;
  phone: string;
  email: string;
  address: string;
  user: string;
}

@Component({
  selector: 'tsel-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.scss']
})
export class AddPatientComponent implements OnInit {
  doctorID: string;
  modalTitle: string;
  addPatientForm: FormGroup;  
  private patient: Patient

  constructor( @Inject( MAT_DIALOG_DATA ) public data: any, private formBuilder: FormBuilder,private router: Router, private contactService: ContactService, private authService: AuthService, private patientService: PatientsService ) {
    this.doctorID = authService.doctorID;
    this.modalTitle = data.title;
    /*this.patient.id = data.id;
    this.patient.name = data.name;
    this.patient.birthday = data.birthday;
    this.patient.email = data.email;
    this.patient.address = data.address;*/
    //this.patient.id = '';
   
  }

  ngOnInit() {
    this.addPatientForm = this.formBuilder.group( {      
      name: [ '', Validators.required ],
      birthday: [ '', Validators.required ],
      email: [ '', Validators.required ],
      phone: [ '', Validators.required ],      
      address: [ '', Validators.required ],
      notes: [ '', Validators.required ],
      user: [ '', Validators.required ]
    } )
  }

  savePatient(){
    this.patientService.save( this.addPatientForm.value )
    .subscribe( data => {
      console.log( data );
    } )
    console.info('save patient');
  }

  selectPatient() {
    console.info("test")
  }

}
