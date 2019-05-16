import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoodService } from 'src/app/services/client/mood.service';
import { Storage } from '@ionic/storage';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  public date = this.route.snapshot.params.moodDate;
  public moods = null;
  private token = null;
  public loading = true;
  constructor(
    private route: ActivatedRoute,
    private moodService: MoodService,
    private storage: Storage
  ) { }

  ngOnInit() {
    console.log(this.route.snapshot.params);
    this.getMoodDay();
  }
  async getMoodDay() {
    const date = new Date(
      this.date.split('/')[2],
      this.date.split('/')[1] - 1,
      this.date.split('/')[0]
    );
    date.setHours(0, 0, 0, 0);
    const dateString = date.toISOString();
    this.token = await this.storage.get('authToken');
    this.moods = await this.moodService.getMood(dateString, this.token).toPromise();
    this.loading = false;
    this.moods.entries.forEach(mood => {
      mood.questions.forEach(question => {
        question.data = JSON.parse(question.data);
        if (mood === this.moods.entries[this.moods.entries.length - 1] && question === mood.questions[mood.questions.length - 1]) {
          console.log(this.moods);
        }
      });
    });
  }
  getTime(date) {
    const newDate = new Date(date);
    const timeString = `${newDate.getHours().toString().length === 1 ? ('0' + newDate.getHours()) : (newDate.getHours())}` +
      `:${newDate.getMinutes().toString().length === 1 ?
        ('0' + newDate.getMinutes()) : (newDate.getMinutes())}`;
    return timeString;
  }
  getAverageMood() {
    const moods = this.moods.entries.map(mood => {
      return mood.entry.mood;
    });
    const five = moods.filter(value => value === 5).length;
    const four = moods.filter(value => value === 4).length;
    const three = moods.filter(value => value === 3).length;
    const two = moods.filter(value => value === 2).length;
    const one = moods.filter(value => value === 1).length;
    return this.getSrc(Math.round
      (
        ( (5 * five) + (4 * four) + (3 * three) + (2 * two) + (1 * one) ) / 
        (five + four + three + two + one)
      ));
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
  getMoodName(value) {
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
        return 'Zeer Goed';
      }
    }
  }

}
