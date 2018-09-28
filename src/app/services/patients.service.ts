import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PatientsService {
  doctorID: string;

  constructor( private http: HttpClient, private auth: AuthService ) { 
    this.doctorID = auth.doctorID;
  }

  getPatient( patientID:string ) {
    return this.http.get(`${environment.base_api}/patient/${patientID}/doctor/${this.doctorID}`);
  }

  update( id:string, info:any ) {
    return this.http.patch(`${environment.base_api}/users/${id}`, info);
  }

  save( info:any ) {
    info.roles = ["Patient"];
    info.active = false;
    info.canAccess = [ this.doctorID ]

    return this.http.post(`${environment.base_api}/users/`, info);
  }
}
