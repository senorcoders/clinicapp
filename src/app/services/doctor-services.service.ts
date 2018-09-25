import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { AuthService } from '../services/auth.service';


export interface doctorservice {
  id: string;
  name: string;
  price: number;
  serviceImage: string;
}

@Injectable({
  providedIn: 'root'
})
export class DoctorServicesService {
  doctorID: string;

  constructor( private http: HttpClient, private auth: AuthService ) {
    this.doctorID = auth.doctorID;
  }
  save( contact: any ) {
    return this.http.post<doctorservice>( environment.base_api + '/services', contact )
  }

  update( id:string, contact:any ) {
    return this.http.patch<doctorservice>( environment.base_api + '/services/' + id, contact )
  }

  delete ( service_id: string ) {
    return this.http.delete<doctorservice>( environment.base_api + '/services/' + service_id )
  }
}
