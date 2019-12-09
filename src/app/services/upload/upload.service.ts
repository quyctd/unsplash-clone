import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadService extends BaseService {

  constructor(http: HttpClient) {
    super(http);
    this.baseUrl += 'uploads';
  }

  upload(listUpload): Observable<any> {
    return this.http.post(this.baseUrl, listUpload, {headers: this.httpHeaders});
  }
}
