import { Component, OnInit, Inject  } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'tsel-upload-avatar',
  templateUrl: './upload-avatar.component.html',
  styleUrls: ['./upload-avatar.component.scss']
})
export class UploadAvatarComponent implements OnInit {
  modalTitle: string;
  appointmentID: number;
  selectedFile: File = null;
  doctorID: string;
  constructor( @Inject( MAT_DIALOG_DATA ) public data: any, private http: HttpClient, authservice: AuthService ) { 
    this.modalTitle = data.title;
    this.appointmentID = data.id;
    this.doctorID = authservice.doctorID;
    console.log(data);
  }

  ngOnInit() {
  }

  onFileSelected( event ){
    console.log( event );
    this.selectedFile = event.target.files[0];
  }
  onUpload( event ) {    
    const fd = new FormData();
    fd.append('avatar', this.selectedFile);
    this.http.post(`${environment.base_api}/users/${this.doctorID}/avatar`, fd)
      .subscribe( res => {
          console.log( res );
      } )
  }
}
