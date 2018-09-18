import { Component, OnInit, Inject  } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'tsel-upload-avatar',
  templateUrl: './upload-avatar.component.html',
  styleUrls: ['./upload-avatar.component.scss']
})
export class UploadAvatarComponent implements OnInit {
  modalTitle: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { 
    this.modalTitle = data.title;
    console.log(data)
  }

  ngOnInit() {
  }

}
