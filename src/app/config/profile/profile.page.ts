import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  constructor(private fb: FormBuilder) {}
  form: FormGroup;

  get gender() {
    return this.form.get('gender').value;
  }

  set gender(ev: CustomEvent) {
    this.form.get('gender').patchValue(ev.detail.value);
  }

  ngOnInit() {
    this.form = this.fb.group({
      height: new FormControl('', Validators.required),
      weight: new FormControl('', Validators.required),
      age: new FormControl('', Validators.required),
      gender: new FormControl('0', Validators.required),
    });
  }

  next() {}
}
