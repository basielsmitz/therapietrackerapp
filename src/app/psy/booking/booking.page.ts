import { Component, OnInit } from '@angular/core';
import { SessionService } from './../../services/psy/session.service';
import { Storage } from '@ionic/storage';
import { ClientService } from 'src/app/services/psy/client.service';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.page.html',
  styleUrls: ['./booking.page.scss'],
})
export class BookingPage implements OnInit {
  public month = null;
  public visibleWeek = null;
  public currentWeek = 1;
  private slotsAdded = false;
  private previousUrl = null;
  public loading = true;

  constructor(
    private sessionService: SessionService,
    private clientService: ClientService,
    private storage: Storage,
    private router: Router
  ) {
    router.events.subscribe(route => {
      if (route instanceof NavigationEnd) {
        if (this.previousUrl && this.previousUrl.substring(12, this.previousUrl.length)) {
          console.log('yes');
          this.getSessions();
        }

        this.previousUrl = route.url;
      }
    });
  }

  ngOnInit() {
    this.getSessions();
  }
  async getSessions() {
    const token = await this.storage.get('authToken');
    // const sessionTask: any = await this.sessionService.getAllSessions(token).toPromise();
    // const clientTask = this.clientService.getClients(token).toPromise();
    // const data: any = [await sessionTask, await clientTask];
    const data: any = await Promise.all([
      this.sessionService.getAllSessions(token).toPromise(),
      this.clientService.getClients(token).toPromise()
    ]);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    today.setDate(today.getDate() + 1);
    let tempSessions = data[0].data.entries.filter((session) => {
      const sessionDate = new Date(session.date);
      return sessionDate.getTime() > today.getTime();
    });
    console.log(tempSessions);
    if (tempSessions.length > 0) {
      tempSessions = tempSessions.map(session => {
        return {
          id: session.id,
          date: session.date,
          startTime: session.startTime.substring(0, session.startTime.length - 3),
          endTime: session.endTime.substring(0, session.endTime.length - 3),
          location: session.location,
          client: data[1].data.filter(client => {
            return client.id === session.clientId;
          })
        };
      });
      tempSessions.sort((a: any, b: any) => {
        const dateA = new Date(`${a.date.substring(0, 10)}T${a.startTime}`);
        const dateB = new Date(`${b.date.substring(0, 10)}T${b.startTime}`);
        return dateA.getTime() - dateB.getTime();
      });
      this.groupByDay(tempSessions);
    } else {
      this.fillMonth(tempSessions);
    }
  }
  groupByDay(sessions) {
    const grouped = [];
    let previousDay = null;
    sessions.forEach((session, index) => {
      const date = new Date(session.date);
      const dateString = `${(date.getDate()).toString().length > 1 ? date.getDate() : '0' + (date.getDate())}` +
        `/${(date.getMonth() + 1).toString().length > 1 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)}` +
        `/${date.getFullYear()}`;
      if (dateString !== previousDay) {
        grouped.push({
          date: dateString,
          sessions: [session]
        });
        previousDay = dateString;
      } else {
        const i = grouped.findIndex(day => day.date === dateString);
        grouped[i].sessions.push(session);
        previousDay = dateString;
      }
      if (index === sessions.length - 1) {
        this.fillMonth(grouped);
      }
    });
  }
  fillMonth(sessions) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    today.setDate(today.getDate() + 1);
    const month = [];
    let week = null;
    let sessionIndex = 0;
    let sessionDate = null;
    let currentDate = null;
    if (sessions.length > 0) {
      currentDate = new Date(sessions[0].date.split('/')[2], sessions[0].date.split('/')[1] - 1, sessions[0].date.split('/')[0]);
    } else {
      currentDate = today;
    }
    for (let i = 0; i <= 30; i++) {
      if (sessions[sessionIndex]) {
        sessionDate = new Date(
          sessions[sessionIndex].date.split('/')[2],
          sessions[sessionIndex].date.split('/')[1] - 1,
          sessions[sessionIndex].date.split('/')[0]
        );
      }
      const day = currentDate.getDay();
      const dateString = `${(currentDate.getDate()).toString().length > 1 ? currentDate.getDate() : '0' + (currentDate.getDate())}` +
        `/${(currentDate.getMonth() + 1).toString().length > 1 ? currentDate.getMonth() + 1 : '0' + (currentDate.getMonth() + 1)}` +
        `/${currentDate.getFullYear()}`;
      if (sessionDate && currentDate.getTime() === sessionDate.getTime()) {
        sessions[sessionIndex].name = this.getDayName(day);
        sessions[sessionIndex].week = week;
        month.push(sessions[sessionIndex]);
        sessionIndex++;
      } else {
        month.push({
          date: dateString,
          fullDate: currentDate,
          sessions: [],
          name: this.getDayName(day),
          week: week
        });
      }
      currentDate.setDate(currentDate.getDate() + 1);
      if (i === 30) {
        let addingBefore = true;
        this.month = month;
        const beforeSession = new Date(
          this.month[0].date.split('/')[2],
          this.month[0].date.split('/')[1] - 1,
          this.month[0].date.split('/')[0]
        );
        if (today < beforeSession) {
          const beforeDay = beforeSession.getDay();
          beforeSession.setDate(beforeSession.getDate() - 1);
          while (addingBefore) {
            const dateStringBefore =
              `${(beforeSession.getDate()).toString().length > 1 ? beforeSession.getDate() : '0' + (beforeSession.getDate())}` +
              // tslint:disable-next-line:max-line-length
              `/${(beforeSession.getMonth() + 1).toString().length > 1 ? beforeSession.getMonth() + 1 : '0' + (beforeSession.getMonth() + 1)}` +
              `/${beforeSession.getFullYear()}`;
            month.unshift({
              date: dateStringBefore,
              sessions: [],
              name: this.getDayName(beforeSession.getDay()),
              week: null
            });
            if (beforeSession.getTime() === today.getTime()) {
              addingBefore = false;
              week = 1;
              this.month.forEach((aDay, index) => {
                aDay.week = week;
                if (month[index].name === 'Zondag') {
                  week++;
                }
                if (aDay === this.month[this.month.length - 1]) {
                  this.fillDays();
                }
              });
            }
            beforeSession.setDate(beforeSession.getDate() - 1);
          }
        } else {
          week = 1;
          this.month.forEach((aDay, index) => {
            aDay.week = week;
            if (month[index].name === 'Zondag') {
              week++;
            }
            if (aDay === this.month[this.month.length - 1]) {
              this.fillDays();
            }
          });
        }
      }
    }
  }
  fillDays() {
    this.month.forEach(day => {
      if (day.sessions.length > 0) {
        const tempSessions = [];
        const startOfDay = new Date();
        startOfDay.setHours(8, 0, 0);
        const endOfDay = new Date();
        endOfDay.setHours(16, 0, 0);
        let previousTime = null;
        day.sessions.forEach((session, index) => {
          const sessionStartTime = new Date();
          sessionStartTime.setHours(session.startTime.split(':')[0], session.startTime.split(':')[1], 0);
          const sessionEndTime = new Date();
          sessionEndTime.setHours(session.endTime.split(':')[0], session.endTime.split(':')[1], 0);
          if (index === 0) {
            if (sessionStartTime.getTime() > startOfDay.getTime()) {
              tempSessions.push({
                type: 'free',
                start: '08:00',
                end: session.startTime
              });
            }
            tempSessions.push(session);
          }
          if (previousTime !== sessionStartTime &&
            sessionEndTime.getTime() !== endOfDay.getTime() &&
            sessionStartTime.getTime() > startOfDay.getTime() && index !== 0) {
            const timeString = `${previousTime.getHours().toString().length === 1 ?
              ('0' + previousTime.getHours()) : (previousTime.getHours())}` +
              `:${previousTime.getMinutes().toString().length === 1 ?
                ('0' + previousTime.getMinutes()) : (previousTime.getMinutes())}`;
            if (timeString !== session.startTime) {
              tempSessions.push({
                type: 'free',
                start: timeString,
                end: session.startTime
              });
            }
            tempSessions.push(session);
          }
          if (index === day.sessions.length - 1) {
            if (tempSessions.indexOf(session) < 0) {
              tempSessions.push(session);
            }
            if (sessionEndTime.getTime() !== endOfDay.getTime()) {
              tempSessions.push({
                type: 'free',
                start: session.endTime,
                end: '16:00'
              });
            }
            day.sessions = tempSessions;
          }
          previousTime = sessionEndTime;
        });
      } else {
        day.sessions.push({
          type: 'free',
          start: '08:00',
          end: '16:00'
        });
      }
      if (day === this.month[this.month.length - 1]) {
        this.setVisibleWeek(1);
        this.loading = false;
      }
    });
  }
  setVisibleWeek(num) {
    this.currentWeek = num;
    if (num >= 1 && num <= this.month[this.month.length - 1].week) {
      this.visibleWeek = this.month.filter(session => {
        return session.week === num;
      });
    }
  }
  getDayName(day) {
    switch (day) {
      case 0: return 'Zondag'; break;
      case 1: return 'Maandag'; break;
      case 2: return 'Disdag'; break;
      case 3: return 'Woensdag'; break;
      case 4: return 'Donderdag'; break;
      case 5: return 'Vrijdag'; break;
      case 6: return 'Zaterdag'; break;
    }
  }
  bookingAction(item, day) {
    if (item.type === 'free') {
      this.router.navigate(['psy/booking/new', { from: item.start, to: item.end, day: day.date }]);
    } else {
      this.router.navigate(['./psy/booking/' + item.id]);
    }
  }
}
