import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MoodPage } from './mood.page';
import { SharedModule } from 'src/app/psy/modules/shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: MoodPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MoodPage]
})
export class MoodPageModule {}
