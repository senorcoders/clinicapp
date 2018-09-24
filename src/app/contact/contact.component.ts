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
  userID: number;
  addContactForm: FormGroup;


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
    this.userID = data.id;
    console.log(data);
   }

  ngOnInit() {
    this.addContactForm = this.formBuilder.group( {      
      typo: [ '', Validators.required ],
      value: [ '', Validators.required ],
      user: ['', Validators.required ]
    } )
  }

  saveContact() {
    this.contactService.saveContact( this.addContactForm.value )
      .subscribe( data => {
        console.log( data );
      } )
  }

  

}
