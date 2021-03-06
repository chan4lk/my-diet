import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { IonSlides, ViewWillEnter } from '@ionic/angular';
import { switchMap, take } from 'rxjs/operators';
import { ProfileResponse } from 'src/app/models/profile.model';
import { UserDetailsResponse } from 'src/app/models/user.model';
import { ProfileService } from 'src/app/services/profile.service';
import { StoreService } from 'src/app/services/store.service';
import { async } from 'rxjs/internal/scheduler/async';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit, ViewWillEnter {
  profile: ProfileResponse;
  user: UserDetailsResponse;
  constructor(
    private fb: FormBuilder,
    private store: StoreService,
    private profileService: ProfileService,
    private router: Router
  ) {}
  form: FormGroup;
  targetForm: FormGroup;
  goalForm: FormGroup;
  activityForm: FormGroup;
  @ViewChild(IonSlides, {static: true}) slides: IonSlides;
  ngOnInit() {
    this.form = this.fb.group({
      height: new FormControl('', Validators.required),
      weight: new FormControl('', Validators.required),
      age: new FormControl('', Validators.required),
      gender: new FormControl(0, Validators.required),
      isVeg: new FormControl(true, []),
    });
    this.activityForm = this.fb.group({
      activityLevel: new FormControl('0', Validators.required),
    });

    this.goalForm = this.fb.group({
      goal: new FormControl('0', Validators.required),
    });
    this.targetForm = this.fb.group({
      pace: new FormControl('0', []),
      targetWeight: new FormControl('0', [Validators.required, Validators.min(1)]),
    });

    this.goalForm.valueChanges.subscribe((values) => {
      if (values.goal !== '1') {
        this.targetForm.controls.targetWeight.setValidators([
          Validators.required,
          Validators.min(1),
        ]);
      } else {
        this.targetForm.controls.targetWeight.clearValidators();
      }
      this.targetForm.controls.targetWeight.updateValueAndValidity();
    });
  }

  ionViewWillEnter() {
    this.slides.slideTo(0);
    this.store.userData$
      .pipe(
        take(1),
        switchMap((user) => {
          this.user = user;
          return this.profileService.getProfile(user.id);
        })
      )
      .subscribe((profile) => {
        if (profile && profile.id) {
          this.profile = profile;
          this.form.patchValue({
            height: profile.height,
            weight: profile.weight,
            age: profile.age,
            gender: profile.gender.toString(),
            isVeg: profile.isVeg,
          });

          this.activityForm.patchValue({
            activityLevel: profile.activityLevel.toString(),
          });

          this.targetForm.patchValue({
            pace: profile.pace.toString(),
            targetWeight: profile.targetWeight,
          });

          this.goalForm.patchValue({
            goal: profile.goal.toString(),
          });
        }
      });
  }

  next(slides: IonSlides) {
    slides.slideNext();
  }

  save() {
    this.profile = {
      ...this.profile,
      ...this.form.value,
      ...this.goalForm.value,
      ...this.targetForm.value,
      activityLevel: parseInt(this.activityForm.value.activityLevel, 10),
      pace: parseInt(this.targetForm.value.pace, 10),
      goal: parseInt(this.goalForm.value.goal, 10),
      gender: parseInt(this.form.value.gender, 10),
      targetWeight: parseFloat(this.targetForm.value.targetWeight),
      userId: this.user.id,
    };
    if (this.profile.id) {
      this.profileService
        .updateProfile(this.profile.id, this.profile)
        .subscribe(() => {
          // await slides.slideTo(0);
          this.router.navigate(['/home']);
        });
    } else {
      this.profileService.createProfile(this.profile).subscribe(() => {
        // await slides.slideTo(0);
        this.router.navigate(['/home']);
      });
    }
  }
}
