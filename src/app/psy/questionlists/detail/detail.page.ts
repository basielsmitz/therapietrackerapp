import { Component, OnInit, DoCheck } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NewQuestionComponent } from './../../components/new-question/new-question.component';
import { QuestionlistService } from './../../../services/psy/questionlist.service';
import { Storage } from '@ionic/storage';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  public questions = [];
  public title = null;
  public description = null;
  public disabled = true;
  private token = null;

  constructor(
    private modalController: ModalController,
    private questionlistService: QuestionlistService,
    private storage: Storage,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.getList();
  }
  ngDoCheck() {
    if (this.title && this.questions.length > 0) {
      this.disabled = false;
    } else {
      this.disabled = true;
    }
  }
  async getList() {
    this.token = await this.storage.get('authToken');
    const list: any = await this.questionlistService.getQuestionList(this.route.snapshot.params.listId, this.token).toPromise();
    if(list) {
      this.title = list.data.entry.title;
      this.description = list.data.entry.description;
      list.data.questions.forEach(question => {
        this.questions.push({
          question: question.question,
        description: question.description,
        type: question.type,
        options: question.type === 'select' ? JSON.parse(question.data) : null,
        range: question.type === 'range' ? JSON.parse(question.data) : null,
        data: question.data,
        });
      });
    }
  }
  delete(question) {
    this.questions.splice(this.questions.indexOf(question), 1);
  }
  async newQuestion() {
    const modal = await this.modalController.create({
      component: NewQuestionComponent,
      componentProps: {
        question: null,
        description: null,
        type: 'ja/nee',
      }
    });
    await modal.present();
    const data = await modal.onDidDismiss();
    if (data.data) {
      let qData = null;
      if(data.data.type === 'select') {
        qData = data.data.options;
      }
      if(data.data.type === 'range') {
        qData = data.data.range;
      }
      this.questions.push({
        question: data.data.question,
        description: data.data.description,
        type: data.data.type,
        options: data.data.options,
        range: data.data.range,
        data: JSON.stringify(qData),
      });
    }
  }
  async editQuestion(question) {
    const modal = await this.modalController.create({
      component: NewQuestionComponent,
      componentProps: {
        question: question.question,
        description: question.description,
        type: question.type,
        range: question.range,
        options: question.options,
      }
    });
    await modal.present();
    const data = await modal.onDidDismiss();
    if (data.data) {
      this.questions.splice(this.questions.indexOf(question), 1);
      let qData = null;
      if(data.data.type === 'select') {
        qData = data.data.options;
      }
      if(data.data.type === 'range') {
        qData = data.data.range;
      }
      this.questions.push({
        question: data.data.question,
        description: data.data.description,
        type: data.data.type,
        options: data.data.options,
        range: data.data.range,
        data: JSON.stringify(qData),
      });
    }
  }
  async save() {
    const ql = await this.questionlistService.updateQuestionLists(this.route.snapshot.params.listId, {
      title: this.title,
      description: this.description,
      questions: this.questions,
    }, this.token).toPromise();
  }
}
