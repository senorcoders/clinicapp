import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { AuthService } from '../services/auth.service';

import { Checkup } from '../interfaces/clinic.interface';

@Injectable({
  providedIn: 'root'
})
export class CheckupsService {
  id: string;
  reason: string;
  notes: number;
  checkupImage: string;
  doctorID: string;

  constructor( private http: HttpClient, private auth: AuthService ) { 
    this.doctorID = auth.doctorID;
  }
  save( checkup: any ) {
    return this.http.post<Checkup>( environment.base_api + '/checkups', checkup )
  }

  update( id:string, checkup:any ) {
    return this.http.patch<Checkup>( environment.base_api + '/checkups/' + id, checkup )
  }

  delete ( checkup_id: string ) {
    return this.http.delete<Checkup>( environment.base_api + '/checkups/' + checkup_id )
  }

  get( appointmentID: string ){
    return this.http.get<Checkup[]>( `${environment.base_api}/checkups?appointment=${appointmentID}` )
  }
}
