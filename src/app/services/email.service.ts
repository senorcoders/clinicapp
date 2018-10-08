import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { AuthService } from '../services/auth.service';

import { Email } from '../interfaces/clinic.interface';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  toEmail:  string;
  subject:  string;
  doctorID: string;

  constructor( private http: HttpClient, private auth: AuthService ) { 
    this.doctorID = auth.doctorID;
  }

  sendPrescriptionEmail( toEmail:string, subject:string, id:string ){
    let data = {
      email: toEmail,
      appointmentID: id,
      subject: subject
    }
    return this.http.post( `${environment.base_api}/sendPrescription`, data );
  }
}
