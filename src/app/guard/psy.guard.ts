import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Storage } from '@ionic/storage';

@Injectable()
export class PsyGuard implements CanActivate {
    constructor(
        private storage: Storage,
        private router: Router,
    ){}
    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const role = await this.storage.get('role');
        const id = await this.storage.get('roleId');
        if (role === 'client' && id ) {
            this.router.navigate(['client/dashboard']);
        }
        if (role !== 'psychologist' && !id ) {
            this.router.navigate(['login']);
        }
        return true;
    }
}