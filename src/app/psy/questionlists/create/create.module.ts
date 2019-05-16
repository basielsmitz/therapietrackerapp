import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/psy/modules/shared/shared.module';

import { CreatePage } from './create.page';
import { NewQuestionModule } from './../../modules/shared/new-question.module';

const routes: Routes = [
  {
    path: '',
    component: CreatePage
  }
];

@NgModule({
  imports: [
CommonModule,
    SharedModule,
    NewQuestionModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CreatePage],
})
export class CreatePageModule {}
