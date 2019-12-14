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

  userInfo(username): Observable<any> {
    return this.http.get(this.baseUrl + username, {headers: this.httpHeaders});
  }
}
