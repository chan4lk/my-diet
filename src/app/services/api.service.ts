import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  /**
   *
   */
  constructor(private http: HttpClient) {}

  get(
    url: string,
    headers: { [key: string]: string } = { 'Content-Type': 'application/json' }
  ) {
    return this.http.get(`${environment.baseUrl}/${url}`, { headers });
  }

  post(
    url: string,
    body: any,
    headers: { [key: string]: string } = { 'Content-Type': 'application/json' }
  ) {
    return this.http.post(`${environment.baseUrl}/${url}`, body, { headers });
  }

  put(
    url: string,
    body: any,
    headers: { [key: string]: string } = { 'Content-Type': 'application/json' }
  ) {
    return this.http.put(`${environment.baseUrl}/${url}`, body, { headers });
  }

  delete(
    url: string,
    headers: { [key: string]: string } = { 'Content-Type': 'application/json' }
  ) {
    return this.http.delete(`${environment.baseUrl}/${url}`, { headers });
  }
}
