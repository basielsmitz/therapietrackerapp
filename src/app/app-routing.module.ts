import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes, CanActivate } from '@angular/router';
import { ClientGuard } from './guard/client.guard';
import { PsyGuard } from './guard/psy.guard';



const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './account/login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './account/register/register.module#RegisterPageModule' },
  { path: 'psy', canActivate: [PsyGuard], loadChildren: './psy/psy.module#PsyPageModule' },
  { path: 'client', canActivate: [ClientGuard], loadChildren: './client/main/main.module#MainPageModule' },
];

@NgModule({
  imports: [
RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
