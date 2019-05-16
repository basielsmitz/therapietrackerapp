import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ClientPage } from './client.page';
import { SharedModule } from '../../modules/shared/shared.module';
import { SharedMoodDayModule } from './../../modules/shared/sharedMoodDay.module';
import { OverviewComponent } from './components/overview/overview.component';
import { GoalsComponent } from './components/goals/goals.component';
import { MoodsComponent } from './components/moods/moods.component';
import { SessionsComponent } from './components/sessions/sessions.component';
import { ChartModule } from './../../modules/shared/chart.module';
import { ChartsModule } from 'ng2-charts';


const routes: Routes = [
  {
    path: '',
    component: ClientPage,
  }
];

@NgModule({
  imports: [
CommonModule,
    ChartModule,
    ChartsModule,
    SharedModule,
    SharedMoodDayModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    ClientPage,
    OverviewComponent,
    GoalsComponent,
    MoodsComponent,
    SessionsComponent,

  ]
})
export class ClientPageModule {}
