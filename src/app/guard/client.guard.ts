import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Storage } from '@ionic/storage';

@Injectable()
export class ClientGuard implements CanActivate {
    constructor(
        private storage: Storage,
        private router: Router,
    ){}
    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const role = await this.storage.get('role');
        const id = await this.storage.get('roleId');
        if (role === 'psychologist' && id ) {
            this.router.navigate(['psy/schedule']);
            return false;
        }
        if (role !== 'client' && !id ) {
            this.router.navigate(['login']);
            return false;
        }
        return true;
    }
}