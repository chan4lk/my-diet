import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class ProgressService {
  constructor(private api: ApiService) {}

  update(userId: number, date: Date, weight: number) {
    return this.api.post(environment.progress, {
      userId,
      date: date.toDateString(),
      weight,
    });
  }
}
