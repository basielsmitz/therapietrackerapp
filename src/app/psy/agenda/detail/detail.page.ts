import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ClientService } from './../../../services/psy/client.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  public loading = true;
  private token = null;
  public clientContact = null
  constructor(
    private storage: Storage,
    private clientService: ClientService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.getData();
  }
  async getData() {
    this.token = await this.storage.get('authToken');
    const clientContact: any = await this.clientService.getClientContact(this.route.snapshot.params.userId, this.token).toPromise();
    this.clientContact = clientContact.data;
    this.loading = false;
  }
  getNumber() {
    const number = `tel:${this.clientContact.contact.phone}`;
    return number;
  }
}
