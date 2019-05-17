import { Component, OnInit } from '@angular/core';
import { AlertController, PopoverController, ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-popover-psy',
  templateUrl: './popover-psy.component.html',
  styleUrls: ['./popover-psy.component.scss'],
})
export class PopoverPsyComponent implements OnInit {

  constructor(
    private alertController: AlertController,
    private http: HttpClient,
    private storage: Storage,
    private toastController: ToastController,
    private popoverController: PopoverController,
  ) { }

  ngOnInit() {}
  async addToDo() {
    this.dismiss();
    const alert = await this.alertController.create({
      header: 'Voeg een ToDo toe',
      inputs: [
        {
          placeholder: 'Geef de ToDo een naam',
          name: 'name',
          type: 'text',
        },
        {
          name: 'date',
          type: 'date',
        },
        {
          name: 'time',
          type: 'time',
        },
      ],
      buttons: [
        {
          text: 'Annuleer',
          role: 'cancel',
          cssClass: 'secondary',
          handler: async () => {
          }
        }, {
          text: 'Verzend',
          handler: async (data) => {
            try {
              const token = await this.storage.get('authToken');
              if (!data.name) {
                const error = new Error('Gelieve een naam te geven');
                throw error;
              }
              const invite = await this.http.post('https://therapietracker-backend.herokuapp.com/psy/todo', data, {
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + token,
                }
              }).toPromise();
              if (invite) {
                const toast = await this.toastController.create({
                  message: 'ToDo werdt opgeslagen',
                  duration: 1500
                });
                await toast.present();
              }
            } catch (err) {
              const toast = await this.toastController.create({
                message: err.message,
                color: 'danger',
                closeButtonText: 'Oké',
                showCloseButton: true,

              });
              await toast.present();
            }
          }
        }
      ]
    });

    await alert.present();

  }

  async addClient() {
    this.dismiss();
    const alert = await this.alertController.create({
      header: 'Voeg cliënt toe',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Naam van de cliënt'
        },
        {
          name: 'email',
          type: 'text',
          placeholder: 'Email van de cliënt'
        },
      ],
      buttons: [
        {
          text: 'Annuleer',
          role: 'cancel',
          cssClass: 'secondary',
          handler: async () => {
          }
        }, {
          text: 'Verzend',
          handler: async (data) => {
            try {
              const token = await this.storage.get('authToken');
              if (!data.email || !data.name) {
                const error = new Error('Vul beide velden in');
                throw error;
              }
              const invite = await this.http.post('https://therapietracker-backend.herokuapp.com/psy/client', data, {
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + token,
                }
              }).toPromise();
              if (invite) {
                const toast = await this.toastController.create({
                  message: 'Client met email: ' + data.email + ' werdt uitgenodigd',
                  duration: 2000
                });
                await toast.present();
              }
            } catch (err) {
              const toast = await this.toastController.create({
                message: err.message,
                color: 'danger',
                closeButtonText: 'Oké',
                showCloseButton: true,

              });
              await toast.present();
            }
          }
        }
      ]
    });

    await alert.present();

  }
  dismiss() {
    this.popoverController.dismiss();
  }
}
