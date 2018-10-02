import { Component, OnInit, Inject  } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
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
  id: string;
  constructor(private  dialogRef: MatDialogRef<UploadAvatarComponent>, @Inject( MAT_DIALOG_DATA ) public data: any, private http: HttpClient, authservice: AuthService ) { 
    this.modalTitle = data.title;    
    if( data.hasOwnProperty("id") ){
      this.id = data.id;
    }else {
      this.id = authservice.doctorID;
    }
    console.log(data);
  }

  ngOnInit() {
  }

  onFileSelected( event ){
    console.log( event );
    this.selectedFile = event.target.files[0];
  }
  onUpload() {    
    const fd = new FormData();
    fd.append('avatar', this.selectedFile);
    this.http.post(`${environment.base_api}/users/${this.id}/avatar`, fd)
      .subscribe( 
        res => {
          console.log( res );
          this.dialogRef.close();
        },
        error => {
          console.log( error );
          this.dialogRef.close();
        } 
      )
  }
}
