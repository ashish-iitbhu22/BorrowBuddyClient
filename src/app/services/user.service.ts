import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  profileData:any
  constructor(private httpClient: HttpClient) {}

  addExpense(payload: any) {
    return this.httpClient.post(`${environment.API_HOST}/expense`, payload);
  }
  getExpense() {
    return this.httpClient.get(`${environment.API_HOST}/expense`);
  }

  setProfile(data:any) {
    this.profileData = data;
  }

  getProfile() {
    return this.profileData;
  }
}
