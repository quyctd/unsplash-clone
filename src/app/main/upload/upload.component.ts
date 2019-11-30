import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  files = [1];
  limit = 10;

  constructor() { }

  ngOnInit() {
  }

  get filesLength() {
    return this.files.length;
  }

  get remain() {
    return this.limit - this.filesLength;
  }
}
