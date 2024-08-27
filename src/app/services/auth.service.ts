import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  sinUp(payload: any) {
    return this.httpClient.post(`${environment.API_HOST}/sinup`, payload);
  }

  sinIn(payload: any) {
    return this.httpClient.post(`${environment.API_HOST}/sinin`, payload, {
      withCredentials: true,
    });
  }

  getProfile(){
     return this.httpClient.get(`${environment.API_HOST}/profile`, {
       withCredentials: true,
     });
  }
}
