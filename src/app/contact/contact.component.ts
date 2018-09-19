import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'tsel-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  modalTitle: string;
  appointmentID: number;

  constructor( @Inject( MAT_DIALOG_DATA ) public data: any ) { 
    this.modalTitle = data.title;
    this.appointmentID = data.id;
    console.log(data);
   }

  ngOnInit() {
  }

}
