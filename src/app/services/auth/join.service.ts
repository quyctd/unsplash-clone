import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class JoinService extends BaseService {
  joinUrl: any;
  
  constructor(http: HttpClient) {
    super(http);
    this.joinUrl = this.baseUrl + 'users/';
  }

  register(joinData): Observable<any> {
    return this.http.post(this.joinUrl, joinData, {headers: this.httpHeaders}).pipe(map((res: Response) => res.json()));
  }

  joinPhoto(): Observable<any> {
    return this.http.get(this.baseUrl + 'join_photo', { headers: this.httpHeaders });
  }
}
