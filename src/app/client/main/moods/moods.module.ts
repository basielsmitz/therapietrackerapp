import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { SharedClientModule } from './../../modules/shared-client/shared-client.module';

import { MoodsPage } from './moods.page';
import { SharedMoodDayModule } from 'src/app/psy/modules/shared/sharedMoodDay.module';
import { ChartModule } from 'src/app/psy/modules/shared/chart.module';
import { ChartsModule } from 'ng2-charts';

const routes: Routes = [
  {
    path: '',
    component: MoodsPage
  }
];

@NgModule({
  imports: [
CommonModule,
    SharedClientModule,
    SharedMoodDayModule,
    ChartModule,
    ChartsModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MoodsPage]
})
export class MoodsPageModule {}
