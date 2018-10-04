import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { AuthService } from '../services/auth.service';

import { Schooling } from '../interfaces/clinic.interface';

@Injectable({
  providedIn: 'root'
})
export class SchoolingService {
  doctorID: string;

  constructor( private http: HttpClient, private auth: AuthService ) { 
    this.doctorID = auth.doctorID;
  }

  save( schooling: any ) {
    return this.http.post<Schooling>( environment.base_api + '/schooling', schooling )
  }

  update( id:string, schooling:any ) {
    return this.http.patch<Schooling>( environment.base_api + '/schooling/' + id, schooling )
  }

  delete ( schooling_id: string ) {
    return this.http.delete<Schooling>( environment.base_api + '/schooling/' + schooling_id )
  }
}
