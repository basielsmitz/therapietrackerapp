import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { SessionService } from 'src/app/services/client/session.service';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.page.html',
  styleUrls: ['./sessions.page.scss'],
})
export class SessionsPage implements OnInit {
  private token = null;
  public comingSessions = null;
  public toEvaluateSessions = null;
  public evaluatedSessions = null;
  public loading = true;

  constructor(
    private storage: Storage,
    private sessionService: SessionService,
    private router: Router,

  ) {
    router.events.subscribe(route => {
      if (route instanceof NavigationEnd) {
        console.log(window.location.href.split('/client/')[1] );

        if (window.location.href.split('/client/')[1] === 'sessions') {
          this.getSessions();
          console.log('reroute');
        }
      }
    });
  }
  ngOnInit() {
    this.getSessions();
  }
  async getSessions() {
    this.token = await this.storage.get('authToken');

    const sessions: any = await this.sessionService.getSessions(this.token).toPromise();
    const today = new Date();
    this.comingSessions = sessions.data.filter(session => {
      const sessionDate = new Date(session.entry.date);
      sessionDate.setHours(
        session.entry.startTime.split(':')[0],
        session.entry.startTime.split(':')[1]
      );
      return today.getTime() < sessionDate.getTime();
    });
    this.toEvaluateSessions = sessions.data.filter(session => {
      const sessionDate = new Date(session.entry.date);
      sessionDate.setHours(
        session.entry.startTime.split(':')[0],
        session.entry.startTime.split(':')[1]
      );
      return session.answers.length <= 0 && today.getTime() > sessionDate.getTime();
    });
    const evaluated = sessions.data.filter(session => {
      const sessionDate = new Date(session.entry.date);
      sessionDate.setHours(
        session.entry.startTime.split(':')[0],
        session.entry.startTime.split(':')[1]
      );
      return session.answers.length > 0 && today.getTime() > sessionDate.getTime();
    });
    this.evaluatedSessions = evaluated.slice(0, 10);
    this.loading = false;
  }

  getScore(session) {
    const question = session.questions.find(q => {
      return q.question = 'Algemene Beoordeeling';
    });
    const score = session.answers.find(answer => {
      return answer.evaluationQuestionId === question.id;
    });
    return score.value;
  }

}
