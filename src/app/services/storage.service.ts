import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  setItem<T>(key: string, value: T) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getItem<T>(key: string, defaultData: T = null) {
    const data = localStorage.getItem(key);
    if (!data || data === '') {
      return defaultData;
    }
    return JSON.parse(data) as T;
  }

  removeItem(key: string) {
    localStorage.removeItem(key);
  }

  clear() {
    localStorage.clear();
  }
}
