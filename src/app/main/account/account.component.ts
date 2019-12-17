import { Component, OnInit, NgZone } from '@angular/core';
import { HelpersService } from 'src/app/services/helpers.service';
import { Router } from '@angular/router';
import { UploadService } from 'src/app/services/upload/upload.service';
import { PhotoUpload } from 'src/app/models/photoUpload.model';
import { Cloudinary } from '@cloudinary/angular-5.x';
import { FileUploader, FileUploaderOptions, ParsedResponseHeaders, FileLikeObject, FileItem, FilterFunction } from 'ng2-file-upload';
import { HttpClient } from '@angular/common/http';
import {DomSanitizer, SafeStyle} from '@angular/platform-browser';
import { UsersService } from 'src/app/services/users/users.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  uploader: FileUploader;
  responses: Array<any>;
  avaResponse: any;
  avaProgress = 0;
  userInfo: any;
  form: FormGroup;

  constructor(
    private fbuilder: FormBuilder,
    private helper: HelpersService,
    private cloudinary: Cloudinary,
    private zone: NgZone,
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    private router: Router,
    private api: UploadService,
    private userApi: UsersService
  ) {
    this.responses = [];
    this.userInfo = {};
  }

  ngOnInit() {

    this.form = this.fbuilder.group({
      first_name: new FormControl('', [Validators.required]),
      last_name: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      location: new FormControl('', [Validators.required]),
      bio: new FormControl('', [Validators.required]),
    });

    // Create the file uploader, wire it to upload to your account
    const uploaderOptions: FileUploaderOptions = {
      url: `https://api.cloudinary.com/v1_1/${this.cloudinary.config().cloud_name}/upload`,
      // Upload files automatically upon addition to upload queue
      autoUpload: true,
      // Use xhrTransport in favor of iframeTransport
      isHTML5: true,
      // Calculate progress independently for each uploaded file
      removeAfterUpload: true,
      // XHR request headers
      headers: [
        {
          name: 'X-Requested-With',
          value: 'XMLHttpRequest'
        }
      ]
    };
    this.uploader = new FileUploader(uploaderOptions);

    this.uploader.onBuildItemForm = (fileItem: any, form: FormData): any => {
      // Add Cloudinary's unsigned upload preset to the upload form
      form.append('upload_preset', this.cloudinary.config().upload_preset);
      // Upload to a custom folder
      // Note that by default, when uploading via the API, folders are not automatically created in your Media Library.
      // In order to automatically create the folders based on the API requests,
      // please go to your account upload settings and set the 'Auto-create folders' option to enabled.
      form.append('folder', 'Upfamous');
      // Add file to upload
      form.append('file', fileItem);

      // Use default "withCredentials" value for CORS requests
      fileItem.withCredentials = false;
      return { fileItem, form };
    };

    // Insert or update an entry in the responses array
    const upsertResponse = fileItem => {

      // Run the update in a custom zone since for some reason change detection isn't performed
      // as part of the XHR request to upload the files.
      // Running in a custom zone forces change detection
      this.zone.run(() => {
        // Update an existing entry if it's upload hasn't completed yet

        // Find the id of an existing item
        const existingId = this.responses.reduce((prev, current, index) => {
          if (current.file.name === fileItem.file.name && !current.status) {
            return index;
          }
          return prev;
        }, -1);
        if (existingId > -1) {
          // Update existing item with new data
          this.responses[existingId] = Object.assign(this.responses[existingId], fileItem);
        } else {
          // Create new response
          this.responses.push(fileItem);
        }
      });
    };

    // Update model on completion of uploading a file
    this.uploader.onCompleteItem = (item: any, response: string, status: number, headers: ParsedResponseHeaders) => {
      this.avaResponse = JSON.parse(response);
      this.updateUserAvatar();
      upsertResponse(
        {
          file: item.file,
          status,
          data: JSON.parse(response)
        }
      );
    };

    // Update model on upload progress event
    this.uploader.onProgressItem = (fileItem: any, progress: any) => {
      console.log(progress);
      this.avaProgress = progress;
      upsertResponse(
        {
          file: fileItem.file,
          progress,
          data: {}
        }
      );
    };

    this.getUserInfomation();
  }

  get uploadText() {
    if (this.avaProgress === 0 || this.avaProgress === 100) {
      return 'Change profile image';
    } else {
      return 'Uploading ' + this.avaProgress + '%...';
    }
  }

  getUserInfomation() {
    this.userApi.accountInfo(this.helper.token).subscribe(
      data => {
        // tslint:disable: no-string-literal
        this.userInfo = data.body;
        this.form.controls['first_name'].setValue(this.userInfo.first_name);
        this.form.controls['last_name'].setValue(this.userInfo.last_name);
        this.form.controls['email'].setValue(this.userInfo.email);
        this.form.controls['username'].setValue(this.userInfo.username);
        this.form.controls['location'].setValue(this.userInfo.location);
        this.form.controls['bio'].setValue(this.userInfo.bio);
      },
      error => {
        console.log(error);
        this.router.navigateByUrl('/404');
      }
    );
  }

  updateUserAvatar() {
    const body = {
      token: this.helper.token,
      avatar: this.avaResponse.url
    };
    this.userApi.updateAva(body).subscribe(
      data => {
        window.location.reload();
      },
      error => {
        console.log(error);
        this.router.navigateByUrl('/404');
      }
    );
  }

  updateUserInfo() {
    const body = {
      token: this.helper.token,
      first_name: this.form.get('first_name').value,
      last_name: this.form.get('last_name').value,
      email: this.form.get('email').value,
      username: this.form.get('username').value,
      location: this.form.get('location').value,
      bio: this.form.get('bio').value,
    };
    this.userApi.updateAccount(body).subscribe(
      data => {
        window.location.reload();
      },
      error => {
        console.log(error);
        this.router.navigateByUrl('/404');
      }
    );
  }

}
