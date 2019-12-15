import { BaseService } from './../base/base.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CollectionsService extends BaseService {

  constructor(http: HttpClient) {
    super(http);
    this.baseUrl += 'collections/';
  }

  createNewClt(body): Observable<any> {
    return this.http.post(this.baseUrl, body, { headers: this.httpHeaders });
  }

  add(body): Observable<any> {
    return this.http.post(this.baseUrl + 'add', body, { headers: this.httpHeaders });
  }

  remove(body): Observable<any> {
    return this.http.post(this.baseUrl + 'remove', body, { headers: this.httpHeaders });
  }
}
