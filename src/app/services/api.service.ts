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

  get<T>(
    url: string,
    headers: { [key: string]: string } = { 'Content-Type': 'application/json' }
  ) {
    return this.http.get<T>(`${environment.baseUrl}/${url}`, { headers });
  }

  post<T>(
    url: string,
    body: any,
    headers: { [key: string]: string } = { 'Content-Type': 'application/json' }
  ) {
    return this.http.post<T>(`${environment.baseUrl}/${url}`, body, {
      headers,
    });
  }

  put<T>(
    url: string,
    body: any,
    headers: { [key: string]: string } = { 'Content-Type': 'application/json' }
  ) {
    return this.http.put<T>(`${environment.baseUrl}/${url}`, body, { headers });
  }

  delete<T>(
    url: string,
    headers: { [key: string]: string } = { 'Content-Type': 'application/json' }
  ) {
    return this.http.delete<T>(`${environment.baseUrl}/${url}`, { headers });
  }
}
