import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-mood-day',
  templateUrl: './mood-day.component.html',
  styleUrls: ['./mood-day.component.scss'],
})
export class MoodDayComponent implements OnInit {
  @Input() moodDay: any;
  public urlPrefix = './';
  constructor() { }

  ngOnInit() {
    if (this.moodDay.moods[0].mood.mood) {
      this.urlPrefix = './moods';
    }
  }
  getAverageMood(averageMood) {
    switch (averageMood) {
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
  getOccurrence(value) {

    const filtered = this.moodDay.moods.filter(mood => {
      if(mood.mood.mood) {
        return mood.mood.mood === value;
      } else {
        return mood.mood === value;
      }
    });
    return filtered.length;
  }
  getClass(value: number) {
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
