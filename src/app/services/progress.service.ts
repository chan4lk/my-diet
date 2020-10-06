import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ProgressList } from '../models/progress.model';
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

  getProgress(userId: number) {
    return this.api.get<ProgressList>(
      `${environment.progress}/User/${userId}?Order.Ascending=false&Order.Property=date&Page.Index=1&Page.Size=50`
    );
  }
}
