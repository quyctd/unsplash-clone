import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends BaseService {

  constructor(http: HttpClient) {
    super(http);
    this.baseUrl += 'users/';
  }

  userInfo(username, token): Observable<any> {
    return this.http.get(this.baseUrl + username + '/' + token, {headers: this.httpHeaders});
  }

  accountInfo(token): Observable<any> {
    return this.http.post(this.baseUrl + 'account', {token}, {headers: this.httpHeaders});
  }

  updateAva(body): Observable<any> {
    return this.http.post(this.baseUrl + 'account/update_ava', body, {headers: this.httpHeaders});
  }

  updateAccount(body): Observable<any> {
    return this.http.post(this.baseUrl + 'account/update', body, {headers: this.httpHeaders});
  }
}
