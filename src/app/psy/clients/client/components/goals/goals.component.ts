import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-psy-goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.scss'],
})
export class GoalsComponent implements OnInit {
  @Input() goals: any;
  public completed = null;
  public running = null;
  public showCompleted = true;
  public view = 'completed';

  constructor() { }

  ngOnInit() {
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
  }
}
