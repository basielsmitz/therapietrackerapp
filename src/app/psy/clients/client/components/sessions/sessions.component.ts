import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-psy-sessions',
  templateUrl: './sessions.component.html',
  styleUrls: ['./sessions.component.scss'],
})
export class SessionsComponent implements OnInit {
  @Input() sessions: any;
  public commingSessions = null;
  public pastEvaluatedSessions = null;
  public pastUnEvaluatedSessions = null;

  constructor() { }

  ngOnInit() {
    const today = new Date();
    this.commingSessions = this.sessions.filter((session) => {
      const sessionDate = new Date(session.session.date);
      return sessionDate.getTime() > today.getTime();
    });

    const pastSessions = this.sessions.filter((session) => {
      const sessionDate = new Date(session.session.date);
      return sessionDate.getTime() < today.getTime();
    });

    this.pastEvaluatedSessions = pastSessions.filter(session => {
      return session.questions[0].answer !== null;
    });
    this.pastUnEvaluatedSessions = pastSessions.filter(session => {
      return session.questions[0].answer === null;
    });

  }

}
