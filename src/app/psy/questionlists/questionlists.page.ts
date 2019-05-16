import { Component, OnInit } from '@angular/core';
import { QuestionlistService } from './../../services/psy/questionlist.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-questionlists',
  templateUrl: './questionlists.page.html',
  styleUrls: ['./questionlists.page.scss'],
})
export class QuestionlistsPage implements OnInit {

  public lists = null;
  private token = null;
  public loading = true;
  constructor(
    private questionListSerivce: QuestionlistService,
    private storage: Storage,
  ) { }

  ngOnInit() {
    this.getQuestionLists();
  }

  async getQuestionLists() {
    this.token = await this.storage.get('authToken');
    this.lists = await this.questionListSerivce.getQuestionLists(this.token).toPromise();
    this.loading = false;
    this.lists = this.lists.data.entries;
    console.log(this.lists);
  }
  addList() {
    console.log('adding list');
  }
  async delete(list) {
    console.log('deleting');
    const deleted = await(this.questionListSerivce.deleteQuestionLists(list.id, this.token)).toPromise();
    console.log(deleted);
    if(deleted) {
      this.lists.splice(this.lists.indexOf(list), 1);
    }
  }

}
