import { Component, OnInit, DoCheck } from '@angular/core';
import { Storage } from '@ionic/storage';
import { GoalService } from 'src/app/services/client/goal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit, DoCheck {
  public title = null;
  public type = 'eenmalig';
  public end = null;
  public minEnd = null;
  public disabled = true;
  private token = null;

  constructor(
    private storage: Storage,
    private goalService: GoalService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.minEnd = new Date();
    this.minEnd.setDate(this.minEnd.getDate() + 1);
  }

  ngDoCheck() {
    if(this.title) {
      this.disabled = false;
    }

    if(!this.end &&  this.type === 'einddatum') {
      this.end = `${this.minEnd.getFullYear()}-${this.minEnd.getMonth() + 1}-${this.minEnd.getDate()}`;
    }
    if(this.type === 'eenmalig') {
      this.end = null;
    }
  }

  async save() {
    this.token = await this.storage.get('authToken');
    let data = null;
    if (this.end) {
       data = {
        title: this.title,
        endDate: ``
      };
    } else {
       data = {
        title: this.title
      };
    }
    const newGoal: any = await this.goalService.createGoal(data, this.token).toPromise();
    if (newGoal) {
      this.router.navigate(['./client/goals/']);
    }
  }

}
