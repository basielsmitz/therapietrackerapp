import { Component, OnInit, DoCheck } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit, DoCheck {

  public pages = [
    {
      title: 'Dashboard',
      url: '/client/dashboard',
      icon: 'speedometer',
    },
    {
      title: 'Moods',
      url: 'child',
      icon: 'Pie',
      open: false,
      children: [
        {
          title: 'Mood overzicht',
          url: '/client/moods',
          icon: 'list',
        },
        {
          title: 'Add Mood',
          url: '/client/moods/create',
          icon: 'add-circle',
        }
      ]

    },
    {
      title: 'Sessies',
      url: '/client/sessions',
      icon: 'calendar',

    },
    {
      title: 'Goals',
      url: 'child',
      icon: 'radio-button-on',
      open: false,
      children: [
        {
          title: 'Goal overzicht',
          url: '/client/goals',
          icon: 'list',
        },
        {
          title: 'Add Mood',
          url: '/client/goal/create',
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
    private storage: Storage,
    ) {
    this.router.events.subscribe((event: RouterEvent) => {
      this.selectedPath = event.url;
    });
   }

   ngDoCheck() {      
      
   }
  ngOnInit() {
  }

  logout() {
    this.storage.clear();
    this.router.navigate(['/login']);
  }

}
