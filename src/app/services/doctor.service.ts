import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

import { AuthService } from '../services/auth.service';

import { Patient, profileInfo } from '../interfaces/clinic.interface';

@Injectable({
  providedIn: 'root'
})


export class DoctorService {
  doctorID: string;
  constructor(private http: HttpClient, private auth: AuthService) {
    this.doctorID = auth.doctorID;
   }

  getDoctorInfo() {
    return this.http.get<profileInfo>(`${environment.base_api}/doctor/${this.doctorID}`);
  }

  updateDoctorInfo( id:string, info:any ) {
    return this.http.patch(`${environment.base_api}/users/${id}`, info);
  }

  saveDoctorInfo( info:any ) {
    info.roles = ["Doctor"];
    info.active = false;

    return this.http.patch(`${environment.base_api}/users/`, info);
  }

  getMyPatients(doctor_id: string) {
    return this.http.get<any[]>(`${environment.base_api}/doctor/${doctor_id}/patients`);
  }

  getMyAsyncPatients(doctor_id: string) {
    return this.http.get<Patient[]>(`${environment.base_api}/doctor/${doctor_id}/patients`);
  }

}
