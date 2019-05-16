import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ClientService } from './../../services/psy/client.service';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.page.html',
  styleUrls: ['./agenda.page.scss'],
})
export class AgendaPage implements OnInit {

  private token = null;
  public clients = null;
  public loading = true;

  constructor(
    private storage: Storage,
    private clientService: ClientService,
  ) { }

  ngOnInit() {
    this.getData();
  }

  async getData() {
    this.token = await this.storage.get('authToken');
    const clients: any = await this.clientService.getClients(this.token).toPromise();
    this.loading = false;
    if (clients) {
      this.clients = clients.data;
    }
  }

}
