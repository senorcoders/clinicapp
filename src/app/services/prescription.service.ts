import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { AuthService } from '../services/auth.service';

import { Prescription } from '../interfaces/clinic.interface';

@Injectable({
  providedIn: 'root'
})
export class PrescriptionService {
  doctorID: string;

  constructor( private http: HttpClient, private auth: AuthService ) { 
    this.doctorID = auth.doctorID;
  }

  save( prescription: any ) {
    return this.http.post<Prescription>( environment.base_api + '/prescription', prescription )
  }

  update( id:string, prescription:any ) {
    return this.http.patch<Prescription>( environment.base_api + '/prescription/' + id, prescription )
  }

  delete ( prescriptionID: string ) {
    return this.http.delete<Prescription>( environment.base_api + '/prescription/' + prescriptionID )
  }

  get( appointmentID: string ){
    return this.http.get<Prescription[]>( `${environment.base_api}/prescription?appointment=${appointmentID}` )
  }
}
