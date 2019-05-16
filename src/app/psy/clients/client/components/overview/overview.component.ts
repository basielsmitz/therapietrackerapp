import { Component, OnInit, Input } from '@angular/core';
import { ClientService } from './../../../../../services/psy/client.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-psy-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit {
  @Input() sessions: any;
  @Input() moods: any;
  @Input() client: any;
  @Input() notes: any;
  public latestNotes = null;
  public inputDiagnosis = false;

  constructor(
    private clientService: ClientService,
    private storage: Storage
  ) { }

  ngOnInit() {
    console.log(this.client);
    if(!this.client.diagnosis) {
      this.inputDiagnosis = true;
    }
    this.latestNotes = this.getLatestNotes();
  }
  getNextSessionDate() {
    const today = new Date();
    const commingSessions = this.sessions.filter((session) => {
      const sessionDate = new Date(session.session.date);
      return sessionDate.getTime() > today.getTime();
    });
    if (commingSessions.length <= 0 ) {
      return false;
    }
    commingSessions.sort((a, b) => {
      const aDate = new Date(a.session.date);
      const bDate = new Date(b.session.date);
      return aDate.getTime() - bDate.getTime();
    });
    const newDate = new Date(commingSessions[0].session.date);
    return `${newDate.getDate()}/${newDate.getMonth() + 1}/${newDate.getFullYear()}`;
  }

  getAmountOfPastSessions() {
    const today = new Date();
    const pastSessions = this.sessions.filter((session) => {
      const sessionDate = new Date(session.session.date);
      return sessionDate.getTime() < today.getTime();
    });
    return pastSessions.length;
  }
  getMood() {
    const mood = this.moods[0].mood.mood;
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
  getLatestEvaluation() {
    const today = new Date();
    const pastSessions = this.sessions.filter((session) => {
      const sessionDate = new Date(session.session.date);
      return sessionDate.getTime() < today.getTime();
    });
    const evaluatedSessions = pastSessions.filter((session) => {
      return session.questions[0].answer != null;
    });
    if (evaluatedSessions.length <= 0) {
      return null;
    } 
    const evaluationQuestion = evaluatedSessions[0].questions.filter(question => {
      return question.question.question === 'Algemene Beoordeeling';
    });
    return evaluationQuestion[0].answer.value;
  }

  getLatestNotes() {
    this.notes.sort((a, b) => {
      const aDate = new Date(a.createdAt);
      const bDate = new Date(b.createdAt);
      return aDate.getTime() - bDate.getTime();
    });
    const fiveNotes = this.notes.slice(0, 5);
    return fiveNotes;
  }
  async saveDiagnosis() {
    const token = await this.storage.get('authToken');
    const client = await this.clientService.updateClient(this.client.id, {
      diagnosis: this.client.diagnosis
    }, token).toPromise();
    this.inputDiagnosis = false;
  }

}
