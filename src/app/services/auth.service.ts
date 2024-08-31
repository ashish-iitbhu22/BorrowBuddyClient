import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authToken = '';
  constructor(private httpClient: HttpClient) {}

  sinUp(payload: any) {
    return this.httpClient.post(`${environment.API_HOST}/sinup`, payload);
  }

  sinIn(payload: any) {
    return this.httpClient.post(`${environment.API_HOST}/sinin`, payload);
  }

  getProfile() {
    return this.httpClient.get(`${environment.API_HOST}/profile`);
  }
  setProfile(payload:any) {
    return this.httpClient.post(`${environment.API_HOST}/profile`, payload);
  }

  addProfileImage(formdata: any) {
    return this.httpClient.post(
      `${environment.API_HOST}/imageUpload`,
      formdata
    );
  }

  setToken(token: any) {
    this.authToken = token;
  }

  getToken() {
    return this.authToken;
  }
}
