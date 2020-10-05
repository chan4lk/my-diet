import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  setItem<T>(key: string, value: T) {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  getItem<T>(key: string, defaultData: T = null) {
    const data = sessionStorage.getItem(key);
    if (!data || data === '') {
      return defaultData;
    }
    return JSON.parse(data) as T;
  }

  removeItem(key: string) {
    sessionStorage.removeItem(key);
  }

  clear() {
    sessionStorage.clear();
  }
}
