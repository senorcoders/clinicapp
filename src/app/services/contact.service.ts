import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  doctorID: string;

  constructor( private http: HttpClient, private auth: AuthService ) { 
    this.doctorID = auth.doctorID;
  }

  saveContact( contact: any ) {
    return this.http.post( environment.base_api + '/contact', contact )
  }

  updateContact( id:string, contact:any ) {
    return this.http.patch( environment.base_api + '/contact/' + id, contact )
  }

  deleteContact ( contact_id: string ) {
    return this.http.delete( environment.base_api + '/contact/' + contact_id )
  }
}
