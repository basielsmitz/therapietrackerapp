import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { MoodDayComponent } from './../../components/mood-day/mood-day.component';


@NgModule({
  declarations: [MoodDayComponent],
  exports: [MoodDayComponent],
  imports: [
CommonModule,
    FormsModule,
    IonicModule,
    RouterModule

  ]
})
export class SharedMoodDayModule { }
