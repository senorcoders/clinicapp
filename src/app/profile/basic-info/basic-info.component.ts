import { Component, OnInit, Inject } from '@angular/core';
import {Router} from "@angular/router";
import { MAT_DIALOG_DATA } from '@angular/material';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import { DoctorService } from '../../services/doctor.service';

@Component({
  selector: 'tsel-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.scss']
})
export class BasicInfoComponent implements OnInit {
  modalTitle: string;
  addBasicInfoForm: FormGroup;
  id: string;
  name: string;
  email: string;
  notes: string;

  constructor( @Inject( MAT_DIALOG_DATA ) public data: any, private formBuilder: FormBuilder,private router: Router, private doctorService: DoctorService ) {
    this.modalTitle = data.title;
    this.id = data.id;
    this.name = data.name;
    this.email = data.email;
    this.notes = data.notes;
  }

  ngOnInit() {
    this.addBasicInfoForm = this.formBuilder.group( {      
      name: [ this.name, Validators.required ],
      email: [ this.email, Validators.required ],
      notes: [this.notes, Validators.required ]
    } )
  }

  saveContact() {    
    this.doctorService.updateDoctorInfo( this.id ,this.addBasicInfoForm.value )
    .subscribe( data => {
      console.log( data );
    } )
    
  }

}
