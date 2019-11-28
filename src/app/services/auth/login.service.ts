import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService extends BaseService {

  constructor(http: HttpClient) {
    super(http);
    this.baseUrl += 'sessions';
  }

  login(loginData): Observable<any> {
    return this.http.post(this.baseUrl, loginData, {headers: this.httpHeaders});
  }
}
