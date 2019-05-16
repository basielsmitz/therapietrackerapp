import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { QuestionlistsPage } from './questionlists.page';
import { SharedModule } from '../modules/shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: QuestionlistsPage
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
  declarations: [QuestionlistsPage]
})
export class QuestionlistsPageModule {}
