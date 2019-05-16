import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { SharedClientModule } from './../../../modules/shared-client/shared-client.module';

import { EvaluatePage } from './evaluate.page';

const routes: Routes = [
  {
    path: '',
    component: EvaluatePage
  }
];

@NgModule({
  imports: [
  CommonModule,
    SharedClientModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EvaluatePage]
})
export class EvaluatePageModule {}
