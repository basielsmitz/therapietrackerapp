import { Component, OnInit } from '@angular/core';
import { Platform, PopoverController } from '@ionic/angular';
import { testUserAgent } from '@ionic/core';
import { PopoverMoreComponent } from '../popover-more/popover-more.component';

@Component({
  selector: 'app-toolbar-client',
  templateUrl: './toolbar-client.component.html',
  styleUrls: ['./toolbar-client.component.scss'],
})

export class ToolbarClientComponent implements OnInit {
  public devWidth = this.platform.width();
  public showMore = false;
  public pagesLeft = [
    {
      title: 'Dashboard',
      url: '/client/dashboard',
      icon: 'speedometer',
      component: 'dashboard',
    },
    {
      title: 'Moods',
      url: '/client/moods',
      icon: 'Pie',
      component: 'moods',

    },
  ];
  public pagesRight = [
    {
      title: 'Sessies',
      url: '/client/sessions',
      icon: 'clipboard',
      component: 'sessions',

    },
    {
      title: 'Goals',
      url: '/client/goals',
      icon: 'radio-button-on',
      component: 'goals',
    },
  ];

  constructor(
    private platform: Platform,
    private popoverController: PopoverController,
  ) { }

  async openMore(ev: any) {
    // this.showMore = !this.showMore;
    const popover = await this.popoverController.create({
      component: PopoverMoreComponent,
      event: ev,
      translucent: true,
      cssClass: 'custom-popover'
    });
    return await popover.present();
  }
  ngOnInit() {}

}
