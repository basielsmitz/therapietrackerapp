import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { MoodService } from 'src/app/services/client/mood.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-moods',
  templateUrl: './moods.page.html',
  styleUrls: ['./moods.page.scss'],
})
export class MoodsPage implements OnInit {
  public moods = null;
  public groupedMoods = null;
  public lineLabels = null;
  public lineData = null;
  private token = null;
  public loading = true;
  constructor(
    private storage: Storage,
    private moodService: MoodService,
    private router: Router,
    ) {
      router.events.subscribe(route => {
        if (route instanceof NavigationEnd) {
            this.getMoods();
        }
      });
     }

  ngOnInit() {
    this.getMoods();
  }

  async getMoods() {
    this.token = await this.storage.get('authToken');
    const moods: any = await this.moodService.getMoods(this.token).toPromise();
    this.loading = false;
    if (moods) {
      this.moods = moods.data.entries;
      this.groupByDay();
    }
  }

  groupByDay() {
    const grouped = [];
    let previousDay = null;
    this.moods.forEach((mood, index) => {
      const date = new Date(mood.createdAt);      
      const dateString = `${(date.getDate()).toString().length > 1 ? date.getDate() : '0' + (date.getDate())}` +
        `/${(date.getMonth() + 1).toString().length > 1 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)}` +
        `/${date.getFullYear()}`;
      if (dateString !== previousDay) {
        grouped.push({
          date: dateString,
          moods: [mood]
        });
        previousDay = dateString;
      } else {
        const i = grouped.findIndex(day => day.date === dateString);
        grouped[i].moods.push(mood);
        previousDay = dateString;
      }
      if (index === this.moods.length - 1) {
        this.getAverageMoods(grouped.slice(0, 7));
      }
    });
  }
  getAverageMoods(grouped) {
    grouped.forEach((moodDay, index) => {
      const values = moodDay.moods.map(mood => {
        return mood.mood;
      });
      const five = values.filter(value => value === 5).length;
      const four = values.filter(value => value === 4).length;
      const three = values.filter(value => value === 3).length;
      const two = values.filter(value => value === 2).length;
      const one = values.filter(value => value === 1).length;
      grouped[index].averageMood = Math.round
        (
          ((5 * five) + (4 * four) + (3 * three) + (2 * two) + (1 * one)) /
          (five + four + three + two + one)
        );
      if (index === grouped.length - 1) {
        this.groupedMoods = grouped;
        this.lineLabels = this.groupedMoods.map(mood => {
          return mood.date.substring(0, 5);
        });
        this.lineData = this.groupedMoods.map(mood => {
          return mood.averageMood;
        });
        this.lineData.reverse();
        this.lineLabels.reverse();
      }
    });
  }
}
