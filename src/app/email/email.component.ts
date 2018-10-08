import { Component, OnInit, Inject } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import { AuthService } from '../services/auth.service';
import { EmailService } from '../services/email.service';
import { SnackBarService } from '../services/snack-bar.service';

import { environment } from '../../environments/environment';

@Component({
  selector: 'tsel-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss']
})
export class EmailComponent implements OnInit {
  modalTitle:     string;
  id:             string;
  doctorID:       string;
  toEmail:        string;
  subject:        string;
  emailForm:      FormGroup;
  
  constructor( @Inject( MAT_DIALOG_DATA ) public data: any, private  dialogRef: MatDialogRef<EmailComponent>, private http: HttpClient, private authservice: AuthService, private formBuilder: FormBuilder, private emailService: EmailService, private snackbar: SnackBarService ) { 
    this.modalTitle = data.title;
    this.id = data.id;
    this.doctorID = authservice.doctorID;
    this.toEmail = data.patientEmail;
    this.subject = data.subject;
  }

  ngOnInit() {
    this.emailForm = this.formBuilder.group( {
      toEmail:       [this.toEmail, Validators.required],
      subject:       [this.subject, Validators.required],
    } )
  }

  send() {
    this.emailService.sendPrescriptionEmail(this.emailForm.controls['toEmail'].value, this.emailForm.controls['subject'].value,  this.id)
    .subscribe( 
      res => {
        console.log( res );
        this.snackbar.showMessage( 'Mensaje Enviado!!!' );
        this.dialogRef.close();
      },
      error => {
        this.snackbar.showMessage("Sucedio un error al enviar el correo. intente mas tarde");
        this.dialogRef.close();

      }
     )
  }

}
