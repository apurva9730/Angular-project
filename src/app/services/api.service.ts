import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  baseUrl: String = 'http://localhost:3000';

  post(url: any, data: any) {
    return this.http.post(`http://localhost:3000/${url}`, data);
  }

  get(url: any) {
    return this.http.get(`url`);
  }

  delete(url: any, id: any) {
    return this.http.delete(`${this.baseUrl}${url}${id}`);
  }

  patch(url: any, id: string, data: any) {
    return this.http.patch(`${this.baseUrl}${url}${id}`, data);
  }
  put(url: any, id: string, data: any) {
    return this.http.put(`${this.baseUrl}${url}${id}`, data);
  }
}
