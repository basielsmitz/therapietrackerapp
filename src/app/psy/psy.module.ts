import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PsyPage } from './psy.page';
import { SharedModule } from './modules/shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: PsyPage,
    children: [
      { path: 'schedule', loadChildren: './schedule/schedule.module#SchedulePageModule' },
      { path: 'agenda', loadChildren: './agenda/agenda.module#AgendaPageModule' },
      { path: 'agenda/:userId', loadChildren: './agenda/detail/detail.module#DetailPageModule' },

      { path: 'clients', loadChildren: './clients/clients.module#ClientsPageModule' },
      { path: 'clients/:clientId', loadChildren: './clients/client/client.module#ClientPageModule' },
      { path: 'clients/:clientId/moods/:moodDate', loadChildren: './clients/client/mood/mood.module#MoodPageModule' },
      { path: 'clients/:clientId/sessions/:bookingId', loadChildren: './booking/detail/detail.module#DetailPageModule' },


      { path: 'booking', loadChildren: './booking/booking.module#BookingPageModule' },
      { path: 'booking/new', loadChildren: './booking/new/new.module#NewPageModule' },
      { path: 'booking/:bookingId', loadChildren: './booking/detail/detail.module#DetailPageModule' },
      { path: 'questionlists', loadChildren: './questionlists/questionlists.module#QuestionlistsPageModule' },
      { path: 'questionlists/create', loadChildren: './questionlists/create/create.module#CreatePageModule' },
      { path: 'questionlists/:listId', loadChildren: './questionlists/detail/detail.module#DetailPageModule' },

    ]
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
  declarations: [PsyPage]
})
export class PsyPageModule {}
