import { ApiService } from './../../core/api.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { AbsentRequest } from './service-interfaces';
import { SystemModel } from '../row-generator/row-generator-interfaces';

@Injectable({
  providedIn: 'root',
})
export class SystemService {
  private systemUrl = 'http://localhost:5000/api/system';

  constructor(private http: HttpClient) { }

  submitData(systemModel: SystemModel): Observable<any> {
    const url = this.systemUrl;
    return this.http.post(url, systemModel);
  }

  approveRequest(id: number, approved: number): Observable<any> {
    const url = `${this.systemUrl}/${id}`;
    return this.http.put(url, approved);
  }

  deleteRequest(id: number): Observable<any> {
    const url = `${this.systemUrl}/${id}`;
    return this.http.delete(url);
  }

  getRequests(): Observable<AbsentRequest[]> {
    return this.http.get<AbsentRequest[]>(this.systemUrl);
  }
}
