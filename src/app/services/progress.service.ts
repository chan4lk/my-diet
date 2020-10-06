import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ProgressList } from '../models/progress.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class ProgressService {
  constructor(private api: ApiService, private datePipe: DatePipe) {}

  update(userId: number, date: Date, weight: number) {
    return this.api.post(environment.progress, {
      userId,
      date: this.datePipe.transform(
        date,
        // tslint:disable-next-line: quotemark
        "yyyy'-'MM'-'dd'T'HH':'mm':'ss'"
      ),
      weight,
    });
  }

  getProgress(userId: number) {
    return this.api.get<ProgressList>(
      `${environment.progress}/User/${userId}?Order.Ascending=false&Order.Property=date&Page.Index=1&Page.Size=50`
    );
  }
}
