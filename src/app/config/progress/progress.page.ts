import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { switchMap, take } from 'rxjs/operators';
import { ProgressService } from 'src/app/services/progress.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.page.html',
  styleUrls: ['./progress.page.scss'],
})
export class ProgressPage implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: StoreService,
    private progressService: ProgressService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      date: new FormControl('', Validators.required),
      weight: new FormControl('', Validators.required),
    });
  }

  save() {
    this.store.userData$
      .pipe(
        take(1),
        switchMap((user) =>
          this.progressService.update(
            user.id,
            new Date(this.form.value.date),
            +this.form.value.weight
          )
        )
      )
      .subscribe(() => this.router.navigate(['/home']));
  }
}
