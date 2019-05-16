import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { MoodService } from 'src/app/services/client/mood.service';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {
  private token = null;
  public questions = null;
  public emotions = null;
  public newEmotion = null;
  public thought = null;
  private originalEmotions = [];
  public loading = true;
  public moods = [
    {
      title: 'Zeer goed',
      src: 'assets/moodIcons/zeerGoed.svg',
      value: 5,
      selected: false
    },
    {
      title: 'Goed',
      src: 'assets/moodIcons/goed.svg',
      value: 4,
      selected: false
    },
    {
      title: 'Matig',
      src: 'assets/moodIcons/matig.svg',
      value: 3,
      selected: false
    },
    {
      title: 'Slecht',
      src: 'assets/moodIcons/slecht.svg',
      value: 2,
      selected: false
    },
    {
      title: 'Zeer slecht',
      src: 'assets/moodIcons/zeerSlecht.svg',
      value: 1,
      selected: false
    },
  ];
  constructor(
    private storage: Storage,
    private moodService: MoodService,
    private router: Router,

  ) {
    router.events.subscribe(route => {
      if (route instanceof NavigationStart) {
        if (window.location.href.split('/client/')[1] === 'moods/create') {
          this.getData();
        }
      }
    });
  }

  ngOnInit() {
    this.getData();
    for (let i = this.moods.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.moods[i], this.moods[j]] = [this.moods[j], this.moods[i]];
    }

  }
  async getData() {
    const randQuestions = [];
    this.token = await this.storage.get('authToken');
    const moodData: any = await this.moodService.getMoodData(this.token).toPromise();
    console.log(moodData);
    const questions = moodData.data.questions.map(question => {
      return {
        id: question.id,
        type: question.type,
        question: question.question,
        data: JSON.parse(question.data),
        value: (question.type === 'range') ? 3 : null,
        fill: (question.type === 'ja/nee') ? 'outline' : null,
      };
    });
    this.emotions = moodData.data.emotions.map(emotion => {
      return {
        id: emotion.id,
        title: emotion.title,
        active: false,
        new: false,
      };
    });
    this.originalEmotions = [...this.emotions];
    for (let i = 0; i < 2; i++) {
      const random = this.getRandom(0, questions.length - 1);
      randQuestions.push(questions[random]);
      questions.splice(random, 1);
      if (i === 1) {
        this.questions = randQuestions;
        console.log(this.questions);
        this.loading = false;
      }
    }

  }
  getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  getFill(active) {
    if (active) {
      return 'solid';
    } else {
      return 'outline';
    }
  }
  selectEmotion(emotion) {
    console.log(emotion);
    this.emotions[this.emotions.indexOf(emotion)].active = !this.emotions[this.emotions.indexOf(emotion)].active;
  }
  addEmotion() {
    if (this.newEmotion) {
      this.emotions.push({
        title: this.newEmotion,
        active: true,
        new: true,
      });
      this.newEmotion = null;
    }
  }
  setMood(newMood) {
    this.moods.forEach(mood => {
      mood.selected = false;
      if (mood.value === newMood.value) {
        mood.selected = true;
      }
    });
  }
  async save() {
    const mood = this.moods.find(md => md.selected === true);
    const emotions = this.emotions.filter(emotion => emotion.active === true && emotion.new === false).map(emotion => {
      return {
        id: emotion.id
      };
    });
    const emotionsNew = this.emotions.filter(emotion => emotion.active === true && emotion.new === true).map(emotion => {
      return {
        title: emotion.title
      };
    });
    const questions = this.questions.map(question => {
      return { id: question.id, value: question.value };
    });
    const data = {
      mood: mood.value,
      thought: this.thought,
      questions: questions,
      emotions: emotions,
      newEmotions: emotionsNew
    };
    const newMood = await this.moodService.newMood(data, this.token).toPromise();
    if (newMood) {
      this.router.navigate(['./client/moods']);
    }
  }

}
