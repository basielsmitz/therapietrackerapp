import { Component, OnInit } from '@angular/core';
import { ClientService } from './../../../services/psy/client.service';
import { Storage } from '@ionic/storage';
import { LoadingService } from 'src/app/services/loading.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-client',
  templateUrl: './client.page.html',
  styleUrls: ['./client.page.scss'],
})
export class ClientPage implements OnInit {
  public slideOpts = {
    effect: 'flip',
    loop: 'true',
    autoheight: 'true',
  };
  public client = null;
  public goals = null;
  public sessions = null;
  public moods = null;
  public notes = null;
  private token = null;
  public view = 'overview';
  public loading = true;

  constructor(
    private clientService: ClientService,
    private storage: Storage,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.getClientData();
  }
  async getClientData() {
    this.token = await this.storage.get('authToken');


    const data: any = await Promise.all([
      this.clientService.getClient(this.route.snapshot.params['clientId'], this.token).toPromise(),
      this.clientService.getClientGoals(this.route.snapshot.params['clientId'], this.token).toPromise(),
      this.clientService.getClientSessions(this.route.snapshot.params['clientId'], this.token).toPromise(),
      this.clientService.getClientMoods(this.route.snapshot.params['clientId'], this.token).toPromise(),
      this.clientService.getClientNotes(this.route.snapshot.params['clientId'], this.token).toPromise(),
    ]);
    this.client = data[0].data;
    this.goals = data[1].data.goals;
    this.sessions = data[2].data.sessions;
    this.moods = data[3].data.moods;
    this.notes = data[4].data.notes;
    this.loading = false;
  }
  segmentChanged(event) {
    this.view = event.detail.value;
  }
}
