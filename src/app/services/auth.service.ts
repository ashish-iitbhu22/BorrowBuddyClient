import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  sinUp(payload: any) {
    return this.httpClient.post('http://localhost:3000/sinup', payload);
  }

  sinIn(payload: any) {
    return this.httpClient.post('http://localhost:3000/sinin', payload);
  }
}
