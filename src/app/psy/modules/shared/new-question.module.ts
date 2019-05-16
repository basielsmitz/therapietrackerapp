import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewQuestionComponent } from './../../components/new-question/new-question.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [NewQuestionComponent, ],
  exports: [NewQuestionComponent],
  imports: [
  CommonModule,
    FormsModule,
    IonicModule,
    RouterModule
  ],
  entryComponents: [
    NewQuestionComponent,
  ]
})
export class NewQuestionModule { }
