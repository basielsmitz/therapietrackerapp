import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/psy/client.service';
import { LoadingService } from './../../services/loading.service';
import { Storage } from '@ionic/storage';
import { ToastController, AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.page.html',
  styleUrls: ['./clients.page.scss'],
})
export class ClientsPage implements OnInit {
  public clients = null;
  private token = null;
  public loading = true;
  constructor(
    private clientService: ClientService,
    private storage: Storage,
    //private loading: LoadingService,
    private toastController: ToastController,
    private http: HttpClient,
    private alertController: AlertController,
  ) { }

  async ngOnInit() {
    // this.loading.present('Cliënten worden geladen');
    this.token = await this.storage.get('authToken');
    this.getClients();
  }

  async getClients() {
    try {
      const clients: any = await this.clientService.getClients(this.token).toPromise();
      this.clients = clients.data;
      this.loading = false;
    } catch (err) {
      let message = 'Er liep iets mis bij het laden van de cliënten';
      let color = 'danger';
      if (err.error.errors.statusCode === 404) {
        message = 'U hebt nog geen clienten';
        color = null;
      }
        const toast = await this.toastController.create({
        message: message,
        color: color,
        closeButtonText: 'Oké',
        showCloseButton: true,
      });
      this.loading = false;
      await toast.present();
      return err;
    }
  }
  getDate(date) {
    const newDate = new Date(date);
    return `${newDate.getDate()}/${newDate.getMonth() + 1}/${newDate.getFullYear()}`;
  }
  getMood(mood) {
    switch (mood) {
      case 1 : {
        return 'Zeer slecht';
      }
      case 2 : {
        return 'Slecht';
      }
      case 3 : {
        return 'Matig';
      }
      case 4 : {
        return 'Goed';
      }
      case 5 : {
        return 'Zeer Goed';
      }

    }
  }
  async addClient() {
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
              const invite = await this.http.post('http://localhost:3000/psy/client', data, {
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
  clicked() {
    console.log('clicked');
  }
}
