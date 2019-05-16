import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/services/client/session.service';
import { Storage } from '@ionic/storage';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-evaluate',
  templateUrl: './evaluate.page.html',
  styleUrls: ['./evaluate.page.scss'],
})
export class EvaluatePage implements OnInit {
  private token = null;
  public session = null;
  public loading = true;
  public questions = null;
  constructor(
    private sessionService: SessionService,
    private storage: Storage,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.getData();
  }

  async getData() {
    this.token = await this.storage.get('authToken');
    const session: any = await this.sessionService.getSession(this.route.snapshot.params.sessionId, this.token).toPromise();
    this.session = session.data;
    this.questions = session.questions.map(question => {
      return {
        id: question.id,
        type: question.type,
        question: question.question,
        data: JSON.parse(question.data),
        value: (question.type === 'range') ? 3 : null
      };
    });
    this.loading = false;
  }
  async save() {
    const data = {
      answers: this.questions.map(question => {
        return {
          id: question.id,
          value: question.value.toString()
        }
      })
    };
    const session: any = await this.sessionService.evaluateSession(this.route.snapshot.params.sessionId, data, this.token).toPromise();
    if (session.messages.length <= 0) {
      this.router.navigate(['./client/sessions/']);
    }
  }

}
