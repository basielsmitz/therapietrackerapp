import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-psy',
  templateUrl: './psy.page.html',
  styleUrls: ['./psy.page.scss'],
})
export class PsyPage implements OnInit {

  public pages = [
    {
      title: 'Dag schema',
      url: '/psy/schedule',
      icon: 'clipboard',
    },
    {
      title: 'Clienten',
      url: '/psy/clients',
      icon: 'people'
    },
    {
      title: 'Booking',
      url: '/psy/booking',
      icon: 'calendar'
    },
    {
      title: 'Agenda',
      url: '/psy/agenda',
      icon: 'contacts'
    },
    {
      title: 'Vragenlijsten',
      url: 'child',
      icon: 'list-box',
      open: false,
      children: [
        {
          title: 'Vragenlijsten',
          url: '/psy/questionlists/',
          icon: 'list',
        },
        {
          title: 'Add vragenlijst',
          url: '/psy/questionlists/create',
          icon: 'add-circle',
        }
      ]
    },
    {
      title: 'Uitloggen',
      url: 'logout',
      icon: 'log-out',
    },
  ];
  selectedPath = '';

  constructor(
    private router: Router,
    private storage: Storage
    ) {
    this.router.events.subscribe((event: RouterEvent) => {
      this.selectedPath = event.url;
    });
   }

  ngOnInit() {
  }
  logout() {
    this.storage.clear();
    this.router.navigate(['/login']);
  }

}
