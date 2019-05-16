import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MainPage } from './main.page';

const routes: Routes = [
  {
    path: '',
    component: MainPage,
    children: [
      { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardPageModule' },
      { path: 'moods', loadChildren: './moods/moods.module#MoodsPageModule' },
      { path: 'moods/create', loadChildren: './moods/create/create.module#CreatePageModule' },
      { path: 'moods/:moodDate', loadChildren: './moods/detail/detail.module#DetailPageModule' },
      { path: 'goals', loadChildren: './goals/goals.module#GoalsPageModule' },
      { path: 'goals/create', loadChildren: './goals/create/create.module#CreatePageModule' },
      { path: 'sessions', loadChildren: './sessions/sessions.module#SessionsPageModule' },
      { path: 'sessions/:sessionId', loadChildren: './sessions/detail/detail.module#DetailPageModule' },
      { path: 'sessions/:sessionId/evaluate', loadChildren: './sessions/evaluate/evaluate.module#EvaluatePageModule' },
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MainPage]
})
export class MainPageModule {}
