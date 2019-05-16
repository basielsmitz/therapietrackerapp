import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { SessionService } from 'src/app/services/client/session.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  public session = null;
  private token = null;
  public generalScore = null;
  public loading = true;
  public render = false;
  constructor(
    private storage: Storage,
    private sessionService: SessionService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.getSession();
  }

  async getSession() {
    this.token = await this.storage.get('authToken');
    const session = await this.sessionService.getSession(this.route.snapshot.params.sessionId, this.token).toPromise();
    this.session = session;
    const generalQuestion = this.session.questions.find(question => {
      return question.question === 'Algemene Beoordeeling';
    });
    const score = this.session.answers.find(answer => {
      return answer.evaluationQuestionId === generalQuestion.id;
    });
    this.generalScore = score.value;
    this.session.questions.forEach(element => {
      element.data = JSON.parse(element.data);
      if(element.id === this.session.questions[this.session.questions.length - 1].id) {
        this.render = true;
        this.loading = false;
      }
    });
  }
  getQuestion(id) {
    const filtered = this.session.questions.filter(question => {
      return question.id === id;
    });
    return filtered[0];
  }
}
