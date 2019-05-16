import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './../../services/authentication.service';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public data = {
    email: null,
    password: null,
  };

  constructor(
    private authService: AuthenticationService,
    private storage: Storage,
    private router: Router,
  ) { }

  async ngOnInit() {
    const role = await this.storage.get('role');
    console.log(role);
    if (role === 'client') {
      this.router.navigate(['client/dashboard']);
    }
    if (role === 'psychologist') {
      this.router.navigate(['psy/schedule']);
    }
   }
  login() {
    this.authService.login(this.data);
  }
}
