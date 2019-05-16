import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './../../services/authentication.service';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  loginData = {
    email: null,
    password: null,
    role: 'client',
  };
  profileData = {
    familyName: null,
    firstName: null,
    phone: null,
    birthdate: null,
  };
  constructor(
    private authenticationService: AuthenticationService,
    private storage: Storage,
    private router: Router
  ) { }

  async ngOnInit() {
    const role = await this.storage.get('role');
    if (role === 'client') {
      this.router.navigate(['dashboard']);
    } 
    if (role === 'psychologist') {
      this.router.navigate(['psy/schedule'])
    }
   }

  register() {
    this.authenticationService.register(this.loginData, this.profileData);
  }

}
