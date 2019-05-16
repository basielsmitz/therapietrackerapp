import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { SharedClientModule } from './../../modules/shared-client/shared-client.module';

import { SessionsPage } from './sessions.page';

const routes: Routes = [
  {
    path: '',
    component: SessionsPage
  }
];

@NgModule({
  imports: [
  CommonModule,
    FormsModule,
    SharedClientModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SessionsPage]
})
export class SessionsPageModule {}
