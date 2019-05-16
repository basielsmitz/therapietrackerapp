import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/services/psy/session.service';
import { LoadingService } from './../../services/loading.service';
import { ClientService } from 'src/app/services/psy/client.service';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';
import { TodoService } from './../../services/psy/todo.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.page.html',
  styleUrls: ['./schedule.page.scss'],
})
export class SchedulePage implements OnInit {
  public sessions = null;
  public todos = null;
  public toDosNoDate = null;
  private token = null;
  public loading = true;

  constructor(
    private sessionService: SessionService,
    private clientService: ClientService,
    private toDoService: TodoService,
    private toastController: ToastController,
    private storage: Storage
  ) { }

  async ngOnInit() {
    this.getData();
  }
  async getData() {
    this.token = await this.storage.get('authToken');
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    const dateString = date.toISOString();
    const data: any = await Promise.all([
      this.sessionService.getSessionsToday(this.token, dateString).toPromise(),
      this.clientService.getClients(this.token).toPromise(),
      this.toDoService.getTodos(this.token).toPromise()
    ]);
    console.log(await this.sessionService.getSessionsToday(this.token, dateString).toPromise())
    console.log(data[0]);
    if(data[0] && data[1]) {
      this.sessions = data[0].data.entries.map(session => {
        return {
          id: session.id,
          icon: 'contact',
          time: session.startTime.substring(0, session.startTime.length - 3),
          location: session.location,
          client: data[1].data.filter(client => {
            return client.id === session.clientId;
          })
        };
      });
      this.sessions.sort((a: any, b: any) => {
        const dateA = new Date('1970/01/01 ' + a.time);
        const dateB = new Date('1970/01/01 ' + b.time);
        return dateA.getTime() - dateB.getTime();
      });
    }
    if(data[2]) {
      const todos = data[2];
      date.setHours(2, 0, 0, 0);
      const todayString = date.toISOString();
      const toDosNoDate = todos.data.filter(todo => {
        return todo.date === '';
      });
      const toDosToday = todos.data.filter(todo => {
        return todo.date === todayString.split('T')[0];
      });
      this.todos = toDosNoDate.concat(toDosToday);
      this.todos = this.todos.filter(todo => {
        return !todo.status;
      });
    }
    this.loading = false;
  }

  async changeStatus(todo) {
    try {
      const newTodo: any = await this.toDoService.changeStatusTodo(todo.id, this.token).toPromise();
      this.todos[this.todos.indexOf(todo)] = newTodo.data;
    } catch (err) {
      let message = 'Er liep iets fout';
      let color = 'danger';
      if (err.error.errors.statusCode === 404) {
        message = 'Er zijn geen sessies vandaag';
        color = '';
      }
      const toast = await this.toastController.create({
        message: message,
        color: color,
        closeButtonText: 'Oké',
        showCloseButton: true,
      });
      await toast.present();
      return err;
    }
  }

}
