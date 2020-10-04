import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {}

  login(email, password) {
    this.auth.login(email, password).subscribe((token) => {
      this.router.navigate(['/home']);
    });
  }
}
