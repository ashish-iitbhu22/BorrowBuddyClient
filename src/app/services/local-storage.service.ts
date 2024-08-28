import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  addItem(key:any, value:any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  removeItem(key:any) {
    localStorage.removeItem(key);
  }

  getItem(key:any) {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  clear() {
    localStorage.clear();
  }
}
