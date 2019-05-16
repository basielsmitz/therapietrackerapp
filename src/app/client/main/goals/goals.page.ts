import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { GoalService } from 'src/app/services/client/goal.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-goals',
  templateUrl: './goals.page.html',
  styleUrls: ['./goals.page.scss'],
})
export class GoalsPage implements OnInit {
  private goals = null;
  public completed = null;
  public running = null;
  public showCompleted = true;
  public view = 'running';
  private token = null;
  public loading = true;
  private
  constructor(
    private storage: Storage,
    private goalService: GoalService,
    private router: Router,
  ) {
    router.events.subscribe(route => {
      if (route instanceof NavigationEnd) {
          this.getGoals();
          this.view = 'running';
      }
    });
   }

  ngOnInit() {
    this.getGoals();
  }
  async getGoals() {
    this.token = await this.storage.get('authToken');
    const goals: any = await this.goalService.getGoals(this.token).toPromise();
    this.goals = goals.data;
    this.structure();
  }
  structure() {
    this.completed = this.goals.filter(goal => {
      return goal.status === true;
    });
    this.completed.sort((a, b) => {
      return a.createdAt  - b.createdAt;
    });
    this.running = this.goals.filter(goal => {
      return goal.status === false;
    });
    this.running.sort((a, b) => {
      return a.createdAt  - b.createdAt;
    });
    this.loading = false;
  }
  async changeStatus(goal) {
    const newGoal: any = await this.goalService.changeStatusGoal(goal.id, this.token).toPromise();
    if (newGoal) {
      if (this.view === 'running'){
        this.running[this.running.indexOf(goal)] = newGoal.data;
      }
      if (this.view === 'completed'){
        this.completed[this.completed.indexOf(goal)] = newGoal.data;
      }
    }
  }
}
