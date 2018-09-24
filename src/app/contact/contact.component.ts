import { Component, OnInit, Inject } from '@angular/core';
import {Router} from "@angular/router";
import { MAT_DIALOG_DATA } from '@angular/material';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import { ContactService } from '../services/contact.service';
import { validateConfig } from '@angular/router/src/config';

export interface ContactTypos {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'tsel-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  modalTitle: string;
  user: number;
  addContactForm: FormGroup;
  typo: string;
  value: string;  
  id: string;

  typos: ContactTypos[] = [
    {value: 'fas fa-phone', viewValue: 'Phone'},
    {value: 'fas fa-map-marked-alt', viewValue: 'Address'},
    {value: 'far fa-hospital', viewValue: 'Emergency'},
    {value: 'fab fa-facebook-f', viewValue: 'Facebook'},
    {value: 'fab fa-twitter', viewValue: 'Twitter'},
    {value: 'fab fa-linkedin-in', viewValue: 'Linkedin'},

  ];

  constructor( @Inject( MAT_DIALOG_DATA ) public data: any, private formBuilder: FormBuilder,private router: Router, private contactService: ContactService ) { 
    this.modalTitle = data.title;
    this.user = data.id;
    this.typo = data.typo;
    this.value = data.value;
    if( data.hasOwnProperty( "contactID" ) ){
      this.id = data.contactID;
    }else {
      this.id = '';
    }
    console.log(data);
   }

  ngOnInit() {
    this.addContactForm = this.formBuilder.group( {      
      typo: [ this.typo, Validators.required ],
      value: [ this.value, Validators.required ],
      user: [this.user, Validators.required ]
    } )
  }

  saveContact() {
    if( this.id != '' ) {
      this.contactService.updateContact( this.id ,this.addContactForm.value )
      .subscribe( data => {
        console.log( data );
      } )
    } else {
      this.contactService.saveContact( this.addContactForm.value )
      .subscribe( data => {
        console.log( data );
      } )
      
    }
    
  }

  

}
