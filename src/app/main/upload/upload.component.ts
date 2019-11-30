import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  files: FileList;
  limit = 10;

  constructor() { }

  ngOnInit() {
  }

  get filesLength() {
    return this.files === undefined ? 0 : this.files.length;
  }

  get remain() {
    return this.limit - this.filesLength;
  }

  handleFilesInput(files: FileList) {
    console.log("Handling.....");
    this.files = files;
    console.log(files.item(0));
  }
}
