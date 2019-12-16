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

  getAllCollections(): Observable<any> {
    return this.http.get(this.baseUrl, { headers: this.httpHeaders });
  }

  userClt(body): Observable<any> {
    return this.http.post(this.baseUrl + 'user', body, { headers: this.httpHeaders });
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

  cltInfo(cltId): Observable<any> {
    return this.http.get(this.baseUrl + cltId, { headers: this.httpHeaders });
  }
}
