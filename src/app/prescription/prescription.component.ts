import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'tsel-prescription',
  templateUrl: './prescription.component.html',
  styleUrls: ['./prescription.component.scss']
})
export class PrescriptionComponent implements OnInit {
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
