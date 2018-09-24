import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class DoctorService {
  doctorID: string;
  constructor(private http: HttpClient, private auth: AuthService) {
    this.doctorID = auth.doctorID;
   }

  getDoctorInfo() {
    return this.http.get(`${environment.base_api}/doctor/${this.doctorID}`);
  }


}
