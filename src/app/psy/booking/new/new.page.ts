import { Component, OnInit, DoCheck, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ClientService } from 'src/app/services/psy/client.service';
import { FormsModule } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { QuestionlistService } from './../../../services/psy/questionlist.service';
import { AlertController, IonSelect } from '@ionic/angular';
import { SessionService } from 'src/app/services/psy/session.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.page.html',
  styleUrls: ['./new.page.scss'],
})
export class NewPage implements OnInit, DoCheck {
  @ViewChild('selectQuestionLists') selectQL: IonSelect;
  public clients: any  = null;
  public times = [];
  public location = null;
  public timeOk = false;
  public data = this.route.snapshot.params;
  public time = null;
  public questionLists = null;
  public selectedQuestionLists = [];
  public client = null;
  private token = null;
  public showNewNote = false;
  public noteText = null;
  public notes = [];
  public iconShown = 'add-circle-outline';
  public readyToPost = false;
  public loading = true;


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private clientService: ClientService,
    private questionlistService: QuestionlistService,
    private alertController: AlertController,
    private sessionService: SessionService,
    private storage: Storage
  ) { }

  ngDoCheck() {
    if (this.client && this.location && this.selectedQuestionLists.length > 0 && this.time ) {
      this.readyToPost = true;
    }
  }

  ngOnInit() {
    this.getData();
    this.getAvailableTimes();
  }
  openNew() {
    this.showNewNote = !this.showNewNote;
    if (this.showNewNote) {
      this.iconShown = 'close-circle-outline';
    } else {
      this.iconShown = 'add-circle-outline';
    }
  }
  async getData(){
    this.token = await this.storage.get('authToken');
    this.clients = await this.clientService.getClients(this.token).toPromise();
    this.questionLists = await this.questionlistService.getQuestionLists(this.token).toPromise();
    this.loading = false;
    const sessionRating = this.questionLists.data.entries.find(ql => ql.title === 'Session rating');
    this.selectedQuestionLists.push(sessionRating.id)
    
  }

  async addNote() {
    this.notes.push(this.noteText);
    this.noteText = null;
    this.showNewNote = false;
     this.iconShown = 'add-circle-outline';
  }
  deleteNote(note) {
    this.notes.splice(this.notes.indexOf(note), 1);
  }
  removeQuestionlist(ql) {
    this.selectedQuestionLists.splice(this.selectedQuestionLists.indexOf(ql), 1);
  }
  getAvailableTimes() {

    const startTime = new Date(
      this.data.day.split('/')[2],
      this.data.day.split('/')[1],
      this.data.day.split('/')[0],
      this.data.from.split(':')[0],
      this.data.from.split(':')[1]
    );
    const endTime = new Date(
      this.data.day.split('/')[2],
      this.data.day.split('/')[1],
      this.data.day.split('/')[0],
      this.data.to.split(':')[0],
      this.data.to.split(':')[1]
    );
    let newDate = new Date(startTime.getTime());
    const hours = Math.abs(endTime.getTime() - startTime.getTime()) / 36e5;
    for (let i = 1; i <= hours; i++) {
      this.times.push(newDate.getHours());
      newDate = new Date(newDate.getTime() + (1 * 60 * 60 * 1000));
      if (newDate.getTime() === endTime.getTime()) {
        this.time = `${this.times[0].toString().length === 1 ? ('0' + this.times[0]) : (this.times[0])}:00`;
        this.timeOk = true;
      }
    }
  }
  openQuestionSelect() {
    this.selectQL.open();
  }
  getListName(id) {
    const list = this.questionLists.data.entries.filter(ql => {
      return ql.id === id;
    });
    return list[0].title;
  }
  async save() {
    const startTime = new Date(
      this.data.day.split('/')[2],
      this.data.day.split('/')[1],
      this.data.day.split('/')[0],
      this.time.split(':')[0],
      this.time.split(':')[1]
    );
    let endTime: any = new Date(startTime.getTime() + (1 * 60 * 60 * 1000));
    endTime = endTime.getHours();
    endTime = `${endTime.toString().length === 1 ? ('0' + endTime) : endTime}:00`;
    const data = {
      date: `${this.data.day.split('/')[2]}-${this.data.day.split('/')[1]}-${this.data.day.split('/')[0]}T00:00:00`,
      startTime: this.time,
      endTime: endTime,
      location: this.location,
      clientId: this.client,
      questionLists: this.selectedQuestionLists.map(list => {
        return { id: list };
      }),
      notes: this.notes.map(note => {
        return { body: note };
      })
    };
    const session = await this.sessionService.postNewSession(data, this.token).toPromise();
    if (session) {
      this.router.navigate(['./psy/booking/']);
    }
  }
}
