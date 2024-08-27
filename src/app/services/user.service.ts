import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  profileData:any
  constructor(private httpClient: HttpClient) {}

  addExpense(payload: any) {
    return this.httpClient.post('http://localhost:3000/expense', payload, {
      withCredentials: true,
    });
  }
  getExpense() {
    return this.httpClient.get('http://localhost:3000/expense', {
      withCredentials: true,
    });
  }

  setProfile(data:any) {
    this.profileData = data;
  }

  getProfile() {
    return this.profileData;
  }
}
