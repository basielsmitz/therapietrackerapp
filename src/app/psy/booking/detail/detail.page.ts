import { Component, OnInit, ViewChild, DoCheck, NgZone } from '@angular/core';
import { SessionService } from 'src/app/services/psy/session.service';
import { Storage } from '@ionic/storage';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionlistService } from './../../../services/psy/questionlist.service';
import { IonSelect, AlertController } from '@ionic/angular';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})


export class DetailPage implements OnInit, DoCheck {
  @ViewChild('selectQuestionLists') selectQL: IonSelect;
  private token = null;
  public session = null;
  public questionLists = null;
  public selectedQuestionLists = [];
  public iconShown = 'add-circle-outline';
  public showNewNote = false;
  public noteText = '';
  public past = false;
  public notes = [];
  public loading = true;
  public originalValues = {
    questionLists: [],
    notes: [],
  };
  public disabled = true;

  constructor(
    private sessionService: SessionService,
    private questionlistService: QuestionlistService,
    private alertController: AlertController,
    private storage: Storage,
    private route: ActivatedRoute,
    private router: Router,
    private ngZone: NgZone,
  ) { }

  ngOnInit() {
    this.getSession();
  }
  ngDoCheck() {
    this.checkValues();
  }

  async getSession() {
    this.token = await this.storage.get('authToken');
    this.session = await this.sessionService.getSession(this.route.snapshot.params.bookingId, this.token).toPromise();
    this.questionLists = await this.questionlistService.getQuestionLists(this.token).toPromise();
    this.questionLists = this.questionLists.data.entries;
    this.session = this.session.data;
    const testDate = new Date(this.session.entry.date);
    testDate.setHours(parseInt(this.session.entry.startTime.split(':')[0], this.session.entry.startTime.split(':')[1]));
    const today = new Date();
    if (testDate.getTime() < today.getTime()) {
      this.past = true;
    }
    this.session.questionLists.forEach(ql => {
      this.selectedQuestionLists.push(ql.id);
      if (ql === this.session.questionLists[this.session.questionLists.length - 1]) {
        this.originalValues.questionLists = [...this.selectedQuestionLists];
      }
    });
    this.session.notes.forEach(note => {
      this.notes.push(note);
      if (note === this.session.notes[this.session.notes.length - 1]) {
        this.originalValues.notes = [...this.notes];
      }
    });
    this.session.questions.forEach(element => {
      element.data = JSON.parse(element.data);
      if(element.id === this.session.questions[this.session.questions.length - 1].id) {
        this.loading = false;
      }
    });
  }
  openQuestionSelect() {
    this.selectQL.open();
  }
  getListName(id) {
    const list = this.questionLists.filter(ql => {
      return ql.id === id;
    });
    return list[0].title;
  }
  getMood(mood) {
    switch (mood) {
      case 1: {
        return 'Zeer slecht';
      }
      case 2: {
        return 'Slecht';
      }
      case 3: {
        return 'Matig';
      }
      case 4: {
        return 'Goed';
      }
      case 5: {
        return 'Zeer Goed';
      }

    }
  }
  openNew() {
    this.showNewNote = !this.showNewNote;
    if (this.showNewNote) {
      this.iconShown = 'close-circle-outline';
    } else {
      this.iconShown = 'add-circle-outline';
    }
  }
  deleteNote(note) {
    this.notes.splice(this.notes.indexOf(note), 1);
  }
  removeQuestionlist(ql) {
    this.selectedQuestionLists.splice(this.selectedQuestionLists.indexOf(ql), 1);
  }
  async addNote() {
    this.notes.push(this.noteText);
    this.noteText = null;
    this.showNewNote = false;
    this.iconShown = 'add-circle-outline';
  }
  save() {
    this.checkValues();
  }
  async cancel() {
    const alert = await this.alertController.create({
      header: 'Bent u zeker dat u deze sessie wil annuleren?',
      buttons: [
        {
          text: 'Nee',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'Ja',
          handler: async () => {
            const session = await this.sessionService.deleteSession(this.route.snapshot.params.bookingId, this.token).toPromise();
            if (session) {
              this.router.navigate(['./psy/booking/']);

            }
          }
        }
      ]
    });
    await alert.present();


  }
  checkValues() {
    if (this.selectedQuestionLists.every(list => this.originalValues.questionLists.includes(list)
      && this.notes.every(note => this.originalValues.notes.includes(note)))) {
      this.disabled = true;
    } else {
      this.disabled = false;
    }
  }
  getQuestion(id) {
    const filtered = this.session.questions.filter(question => {
      return question.id === id;
    });
    return filtered[0];
  }
}
