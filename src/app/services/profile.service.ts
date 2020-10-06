import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ProfileResponse } from '../models/profile.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private api: ApiService) {}

  getProfile(userId: number) {
    return this.api.get<ProfileResponse>(
      `${environment.profile}/User/${userId}`
    );
  }

  updateProfile(id: number, profile: ProfileResponse) {
    return this.api.put<ProfileResponse>(
      `${environment.profile}/${id}`,
      profile
    );
  }

  createProfile(profile: ProfileResponse) {
    return this.api.post<ProfileResponse>(`${environment.profile}`, profile);
  }
}
