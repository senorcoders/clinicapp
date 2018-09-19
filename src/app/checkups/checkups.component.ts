import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'tsel-checkups',
  templateUrl: './checkups.component.html',
  styleUrls: ['./checkups.component.scss']
})
export class CheckupsComponent implements OnInit {
  modalTitle: string;
  appointmentID: number

  constructor( @Inject( MAT_DIALOG_DATA ) public data: any ) { 
    this.modalTitle = data.title;
    this.appointmentID = data.id;
    console.log(data);
  }

  ngOnInit() {
  }

}
