import { BaseService } from './../base/base.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService extends BaseService {

  constructor(http: HttpClient) {
    super(http);
    this.baseUrl += 'items';
  }

  getHomeThumbnail(): Observable<any> {
    return this.http.get(this.baseUrl + '/homepage', {headers: this.httpHeaders});
  }
}
