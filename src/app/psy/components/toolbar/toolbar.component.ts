import { Component, OnInit } from '@angular/core';
import { Platform, PopoverController, AlertController, ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { errorHandler } from '@angular/platform-browser/src/browser';
import { PopoverPsyComponent } from './../popover-psy/popover-psy.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  public devWidth = this.platform.width();
  public showMore = false;
  public psyRoute = 'psy/questioinlists';
  public pages = [
    {
      title: 'Dag schema',
      url: '/psy/schedule',
      icon: 'clipboard',
      component: 'schedule',
    },
    {
      title: 'Clienten',
      url: '/psy/clients',
      icon: 'people',
      component: 'clients',

    },
    {
      title: 'Booking',
      url: '/psy/booking',
      icon: 'calendar',
      component: 'booking',

    },
    {
      title: 'Agenda',
      url: '/psy/agenda',
      icon: 'contacts',
      component: 'agenda',
    },
    {
      title: 'Add',
      url: null,
      icon: 'add-circle',
      funct: 'openMore'
    },
  ];
  constructor(
    private platform: Platform,
    private alertController: AlertController,
    private http: HttpClient,
    private storage: Storage,
    private toastController: ToastController,
    private popoverController: PopoverController,
    ) { }

  ngOnInit() {}
  async openMore(ev: any) {
    //this.showMore = !this.showMore;
    const popover = await this.popoverController.create({
      component: PopoverPsyComponent,
      event: ev,
      translucent: true,
      cssClass: 'custom-popover'
    });
    return await popover.present();
  }
  // async addToDo() {
  //   this.showMore = false;
  //   const alert = await this.alertController.create({
  //     header: 'Voeg een ToDo toe',
  //     inputs: [
  //       {
  //         placeholder: 'Geef de ToDo een naam',
  //         name: 'name',
  //         type: 'text',
  //       },
  //       {
  //         name: 'date',
  //         type: 'date',
  //       },
  //       {
  //         name: 'time',
  //         type: 'time',
  //       },
  //     ],
  //     buttons: [
  //       {
  //         text: 'Annuleer',
  //         role: 'cancel',
  //         cssClass: 'secondary',
  //         handler: async () => {
  //           const toast = await this.toastController.create({
  //             message: 'Geannuleerd',
  //             color: 'warning',
  //             duration: 1500
  //           });
  //           await toast.present();
  //         }
  //       }, {
  //         text: 'Verzend',
  //         handler: async (data) => {
  //           try {
  //             const token = await this.storage.get('authToken');
  //             if (!data.name) {
  //               const error = new Error('Gelieve een naam te geven');
  //               throw error;
  //             }
  //             const invite = await this.http.post('http://localhost:3000/psy/todo', data, {
  //               headers: {
  //                 'Content-Type': 'application/json',
  //                 'Authorization': 'Bearer ' + token,
  //               }
  //             }).toPromise();
  //             if (invite) {
  //               const toast = await this.toastController.create({
  //                 message: 'ToDo werdt opgeslagen',
  //                 duration: 1500
  //               });
  //               await toast.present();
  //             }
  //           } catch (err) {
  //             const toast = await this.toastController.create({
  //               message: err.message,
  //               color: 'danger',
  //               closeButtonText: 'Oké',
  //               showCloseButton: true,

  //             });
  //             await toast.present();
  //           }
  //         }
  //       }
  //     ]
  //   });

  //   await alert.present();

  // }

  // async addClient() {
  //   this.showMore = false;
  //   const alert = await this.alertController.create({
  //     header: 'Voeg cliënt toe',
  //     inputs: [
  //       {
  //         name: 'name',
  //         type: 'text',
  //         placeholder: 'Naam van de cliënt'
  //       },
  //       {
  //         name: 'email',
  //         type: 'text',
  //         placeholder: 'Email van de cliënt'
  //       },
  //     ],
  //     buttons: [
  //       {
  //         text: 'Annuleer',
  //         role: 'cancel',
  //         cssClass: 'secondary',
  //         handler: async () => {
  //           const toast = await this.toastController.create({
  //             message: 'Geannuleerd',
  //             color: 'warning',
  //             duration: 1500
  //           });
  //           await toast.present();
  //         }
  //       }, {
  //         text: 'Verzend',
  //         handler: async (data) => {
  //           try {
  //             const token = await this.storage.get('authToken');
  //             if (!data.email || !data.name) {
  //               const error = new Error('Vul beide velden in');
  //               throw error;
  //             }
  //             const invite = await this.http.post('http://localhost:3000/psy/client', data, {
  //               headers: {
  //                 'Content-Type': 'application/json',
  //                 'Authorization': 'Bearer ' + token,
  //               }
  //             }).toPromise();
  //             if (invite) {
  //               const toast = await this.toastController.create({
  //                 message: 'Client met email: ' + data.email + ' werdt uitgenodigd',
  //                 duration: 2000
  //               });
  //               await toast.present();
  //             }
  //           } catch (err) {
  //             const toast = await this.toastController.create({
  //               message: err.message,
  //               color: 'danger',
  //               closeButtonText: 'Oké',
  //               showCloseButton: true,

  //             });
  //             await toast.present();
  //           }
  //         }
  //       }
  //     ]
  //   });

  //   await alert.present();

  // }

  addQuestionList() {

  }

}
