import { UploadService } from './../../services/upload/upload.service';
import { HelpersService } from './../../services/helpers.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { Cloudinary } from '@cloudinary/angular-5.x';
import { FileUploader, FileUploaderOptions, ParsedResponseHeaders, FileLikeObject, FileItem, FilterFunction } from 'ng2-file-upload';
import { HttpClient } from '@angular/common/http';
import { PhotoUpload } from '../../models/photoUpload.model';
import {DomSanitizer, SafeStyle} from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  responses: Array<any>;
  files = [];
  filesErr = [];
  limit = 10;
  hasBaseDropZoneOver = false;
  uploader: FileUploader;
  showLocation = [];

  message = '';
  imgURL: any;
  isUpload = false;

  constructor(
    private cloudinary: Cloudinary,
    private zone: NgZone,
    private http: HttpClient,
    private helper: HelpersService,
    private sanitizer: DomSanitizer,
    private router: Router,
    private api: UploadService
  ) {
    this.responses = [];
   }

  ngOnInit() {
    // Create the file uploader, wire it to upload to your account
    const uploaderOptions: FileUploaderOptions = {
      url: `https://api.cloudinary.com/v1_1/${this.cloudinary.config().cloud_name}/image/upload`,
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

    this.uploader.addToQueue = (files: File[], options?: FileUploaderOptions, filters?: FilterFunction[] | string) => {
      let list: File[] = [];
      for (const file of files) {
        if (file.size > 10 * 1024 * 1024) {
          const errFile = new PhotoUpload();
          // Get image blob
          const reader = new FileReader();
          const blob = new Blob([file], {type: file.type});

          reader.readAsDataURL(blob);
          // tslint:disable-next-line: variable-name
          reader.onload = (_event) => {
            errFile.imgBlob = (reader.result as string).replace('octet-stream', file.type);
            // Show image to view
            this.filesErr.push(errFile);
          };
        } else {
          list.push(file);
        }
      }

      // Validate limit number files
      const totalFilesLen = this.filesLength + files.length;
      const removeFiles = (totalFilesLen - this.limit) > 0 ? (totalFilesLen - this.limit) : 0;
      list.splice(-1, removeFiles);

      let arrayOfFilters = this.uploader.options.filters;
      let count = this.uploader.queue.length;
      let addedFileItems: FileItem[] = [];

      list.map((some: File) => {
        if (!options) {
          options = this.uploader.options;
        }

        let temp = new FileLikeObject(some);

        if (true) {
          let fileItem = new FileItem(this.uploader, some, options);
          addedFileItems.push(fileItem);
          this.uploader.queue.push(fileItem);
          this.uploader.onAfterAddingFile(fileItem);
        } else {
          this.uploader.onWhenAddingFileFailed(temp, arrayOfFilters, options);
        }

        if (this.uploader.queue.length !== count) {
          this.uploader.onAfterAddingAll(addedFileItems);
          this.uploader.progress = this.getUploaderTotalProgress();
        }
      });

      if (this.uploader.options.autoUpload) {
        this.uploader.uploadAll();
      }
    };

    this.uploader.onAfterAddingFile = (item: any) => {
      this.showLocation.push(false);
      // Build new Upload Photo
      const uploadPhoto = new PhotoUpload();
      uploadPhoto.file = item.file.rawFile;
      uploadPhoto.type = item.file.type;
      uploadPhoto.originalFilename = item.file.name;
      this.readImageInfo(uploadPhoto);
    };

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
      this.updateUploadInfoFromCloudinary(item.file.rawFile, JSON.parse(response));
      console.log('Upload completed: ', JSON.parse(response));
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
      const uploadEle = this.getUploadEleByFile(fileItem.file.rawFile);
      if (uploadEle) { uploadEle.progress = progress; }
      upsertResponse(
        {
          file: fileItem.file,
          progress,
          data: {}
        }
      );
    };
  }

  // Delete an uploaded image
  // Requires setting "Return delete token" to "Yes" in your upload preset configuration
  // See also https://support.cloudinary.com/hc/en-us/articles/202521132-How-to-delete-an-image-from-the-client-side-
  deleteImage = function(data: any, index: number) {
    const url = `https://api.cloudinary.com/v1_1/${this.cloudinary.config().cloud_name}/delete_by_token`;
    const headers = new Headers({ 'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest' });
    const options = { headers };
    const body = {
      token: data.deleteToken
    };
    this.http.post(url, body, options).subscribe(response => {
      console.log(`Deleted image - ${data.cloudId} ${response.result}`);
      // Remove deleted item for responses
      this.responses.splice(index, 1);
    });
  };

  getUploaderTotalProgress = (value: number = 0) => {
    if (this.uploader.options.removeAfterUpload) {
      return value;
    }
    let notUploaded = this.uploader.getNotUploadedItems().length;
    let uploaded = notUploaded ? this.uploader.queue.length - notUploaded : this.uploader.queue.length;
    let ratio = 100 / this.uploader.queue.length;
    let current = value * ratio / 100;
    return Math.round(uploaded * ratio + current);
  }

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  getFileProperties(fileProperties: any) {
    // Transforms Javascript Object to an iterable to be used by *ngFor
    if (!fileProperties) {
      return null;
    }
    return Object.keys(fileProperties)
      .map((key) => ({ key, value: fileProperties[key] }));
  }

  get filesLength() {
    return this.files === undefined ? 0 : this.files.length;
  }

  get remain() {
    return this.limit - this.filesLength;
  }

  getUploadEleByFile(upFile) {
    for (const upPhoto of this.files) {
      if (upPhoto.file == upFile) { return upPhoto; }
    }
  }

  updateUploadInfoFromCloudinary(upFile, newData) {
    const upPhoto = this.getUploadEleByFile(upFile);
    if (upPhoto) {
      upPhoto.width = newData.width;
      upPhoto.height = newData.height;
      upPhoto.originalFilename = newData.original_filename;
      upPhoto.cloudVersion = newData.version;
      upPhoto.cloudId = newData.public_id;
      upPhoto.format = newData.format;
      upPhoto.deleteToken = newData.delete_token;
    }
  }

  readImageInfo(uploadPhoto) {

    // Read image info
    const url = URL.createObjectURL(uploadPhoto.file);
    const img = new Image();
    img.onload = () => {
      uploadPhoto.width = img.width;
      uploadPhoto.height = img.height;
      uploadPhoto.paddingBottom = uploadPhoto.height / uploadPhoto.width * 100;
    };

    img.src = url;

    // Get image blob
    const reader = new FileReader();
    const blob = new Blob([uploadPhoto.file], {type: uploadPhoto.type});

    reader.readAsDataURL(blob);
    // tslint:disable-next-line: variable-name
    reader.onload = (_event) => {
      uploadPhoto.imgBlob = (reader.result as string).replace('octet-stream', uploadPhoto.type);
      // Show image to view
      this.files.push(uploadPhoto);
    };
  }

  hexToBase64(str) {
    // tslint:disable-next-line: max-line-length
    return btoa(String.fromCharCode.apply(null, str.replace(/\r|\n/g, '').replace(/([\da-fA-F]{2}) ?/g, '0x$1 ').replace(/ +$/, '').split(' ')));
  }

  doRemove(i) {
    const upPhoto = this.files[i];
    if (upPhoto.progress != 100) {
      // do nothing
    } else {
      this.deleteImage(upPhoto, i);
      this.files.splice(i, 1);
      this.showLocation.splice(i, 1);
    }
  }

  get publishText() {
    if (this.isUpload) {
      return 'Publishing...';
    }
    if (this.filesLength === 0) {
      return 'Publish to UpFamous';
    } else {
      return 'Publish ' + this.filesLength + ' photo' + (this.filesLength === 1 ? '' : 's');
    }
  }

  isUploading() {
    let isUpload = false;
    for (const file of this.files) {
      if (file.progress !== 100) {
        isUpload = true;
        break;
      }
    }
    return isUpload;
  }

  get canBePublished() {
    return this.files.length !== 0 && !this.isUploading();
  }

  removeErrFiles() {
    this.filesErr = [];
  }

  cancelUpload() {
    this.router.navigateByUrl('/');
  }

  removeFileText(progress) {
    if (progress !== 100) {
      return 'You can not remove when item uploading';
    } else {
      return 'Remove';
    }
  }

  uploadPhotos() {
    let listUploads = [];
    for (let i = 0; i < this.files.length; i++) {
      const upPhoto = this.files[i];
      const itemUpload = {
        width: upPhoto.width,
        height: upPhoto.height,
        uploaded_at: Date.now(),
        cloudinary_id: upPhoto.cloudId,
        cloudinary_ver: upPhoto.cloudVersion,
        format: upPhoto.format,
        original_file_name: upPhoto.originalFilename,
        location: upPhoto.location,
        description: this.getDescription(i)
      };
      listUploads.push(itemUpload);
    }

    let params = {
      auth_token: this.helper.token,
      list_upload: listUploads
    };
    console.log('Send params: ', params);
    this.isUpload = true;

    this.api.upload(params).subscribe(
      data => {
        console.log('Upload successful', data.body);
        this.isUpload = false;
        this.router.navigateByUrl('/');
      },
      error => {
        console.log('Upload error: ', error, error.body);
      },
      () => {
        console.log();
      }
    );
  }

  getDescription(i) {
    const desc = document.getElementById('description_' + i) as HTMLInputElement;
    if (desc.value) { return desc.value; } else { return ''; }
  }

  showAddLocation(i) {
    this.showLocation[i] = true;
  }

  doAddLocation(i) {
    const location = document.getElementById('input_location' + i) as HTMLInputElement;
    this.files[i].location = location.value;
    this.showLocation[i] = false;
  }

  locationText(i) {
    if (this.files[i].location) {
      return this.files[i].location;
    } else { return 'Add location'; }
  }
}
