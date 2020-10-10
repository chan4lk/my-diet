import { ApiService } from './api.service';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { RatingResponse } from '../models/rating.model';

@Injectable({
    providedIn: 'root',
  })
export class RatingService{
    constructor(private api: ApiService) {}

    createRating(rating: RatingResponse) {
        return this.api.post<number>(`${environment.rating}`, rating);
      }
}
