import { Component, OnInit } from '@angular/core';
import { startTimeRange } from '@angular/core/src/profile/wtf_impl';
import { MoodsComponent } from 'src/app/psy/clients/client/components/moods/moods.component';
import { Storage } from '@ionic/storage';
import { MoodService } from 'src/app/services/client/mood.service';
import { SessionService } from 'src/app/services/client/session.service';
import { GoalService } from 'src/app/services/client/goal.service';
import { InvitationService } from 'src/app/services/client/invitation.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  public moods = null;
  public comingSessions = null;
  public toEvaluateSessions = null;
  public goals = null;
  private token = null;
  public loading = true;
  public invites = null;

  constructor(
    private moodService: MoodService,
    private sessionService: SessionService,
    private goalService: GoalService,
    private inviteService: InvitationService,
    private storage: Storage,
    private router: Router,
    ) {
      router.events.subscribe(route => {
        if (route instanceof NavigationEnd) {
            this.getData();
        }
      });
     }

  ngOnInit() {
    this.getData();
  }

  async getData() {
    this.token = await this.storage.get('authToken');
    const data: any = await Promise.all(
      [
        this.inviteService.getInvites(this.token).toPromise(),
        this.sessionService.getSessions(this.token).toPromise(),
        this.moodService.getMoods(this.token).toPromise(),
        this.goalService.getGoals(this.token).toPromise()
      ]
    )
    const today = new Date();
    if (data[0]) {
      this.invites = data[0].data;
    }
    if (data[2]) {
      this.moods = data[2].data.entries.slice(0, 3);
      this.moods.reverse();
    }
    if (data[3]) {
      this.goals = data[3].data.filter(goal => goal.status === false);
      this.goals = this.goals.slice(0, 5);
    }
    if (data[1]) {
      this.comingSessions =  data[1].data.filter(session => {
        const sessionDate = new Date(session.entry.date);
        sessionDate.setHours(
          session.entry.startTime.split(':')[0],
          session.entry.startTime.split(':')[1]
        );
        return today.getTime() < sessionDate.getTime();
      });
      this.toEvaluateSessions = data[1].data.filter(session => {
        const sessionDate = new Date(session.entry.date);
        sessionDate.setHours(
          session.entry.startTime.split(':')[0],
          session.entry.startTime.split(':')[1]
        );
        return session.answers.length <= 0 && today.getTime() > sessionDate.getTime();
      });
      this.toEvaluateSessions = this.toEvaluateSessions.slice(0, 3);
    }
    this.loading = false;
  }
  async answerInvitation(approved, invite) {
    const answer = this.inviteService.answerInvite({
      inviteId: invite.id,
      approved: approved,
    }, this.token).toPromise();
    if (answer) {
      this.invites.splice(this.invites.indexOf(invite), 1);
    }
  }
  getSrc(value) {
    switch (value) {
      case 1: {
        return 'assets/moodIcons/zeerSlecht.svg';
      }
      case 2: {
        return 'assets/moodIcons/slecht.svg';
      }
      case 3: {
        return 'assets/moodIcons/matig.svg';
      }
      case 4: {
        return 'assets/moodIcons/goed.svg';
      }
      case 5: {
        return 'assets/moodIcons/zeerGoed.svg';
      }
    }
  }
  async changeStatus(goal) {
    const newGoal: any = await this.goalService.changeStatusGoal(goal.id, this.token).toPromise();
    if (newGoal) {
      this.goals[this.goals.indexOf(goal)] = newGoal.data;
    }
  }
  getValue(value) {
    switch (value) {
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
        return 'Zeer goed';
      }
    }
  }
  getClass(value) {
    switch (value) {
      case 1: {
        return 'zeerSlecht';
      }
      case 2: {
        return 'slecht';
      }
      case 3: {
        return 'matig';
      }
      case 4: {
        return 'goed';
      }
      case 5: {
        return 'zeerGoed';
      }
    }
  }

}
