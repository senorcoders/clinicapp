import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

import { AuthService } from '../services/auth.service';

import { Appointment } from '../interfaces/clinic.interface';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  doctorID: string;
  constructor(  private http: HttpClient, private auth: AuthService  ) { }

  update( id:string, info:any ) {
    return this.http.patch<Appointment>(`${environment.base_api}/appointments/${id}`, info);
  }

  save( info:any ) {    

    return this.http.post<Appointment>(`${environment.base_api}/appointments/`, info);
  }

  getHistory( patientID:string, doctorID: string ) {
    return this.http.get<Appointment[]>( `${environment.base_api}/appointments/${patientID}/doctor/${doctorID}` );
  }

  getAppointment( appointmentID: string ){
    return this.http.get<Appointment>( `${environment.base_api}/appointments/${appointmentID}` );
  }
}
