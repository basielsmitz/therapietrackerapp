import { Component, OnInit, DoCheck, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-new-question',
  templateUrl: './new-question.component.html',
  styleUrls: ['./new-question.component.scss'],
})
export class NewQuestionComponent implements OnInit, DoCheck {
  @Input() question: string;
  @Input() description: string;
  @Input() type: string;
  @Input() range: any;
  @Input() options: any;

  public disabled = true;
  public newOption = null;

  constructor(
    private modalController: ModalController,
  ) { }

  ngDoCheck() {
    if (this.type === 'select') {
      this.disabled = true;
    }
    if (this.question) {
      if (this.type === 'select') {
        if (this.options.length >= 2) {
          this.disabled = false;
        }
      } else {
        this.disabled = false;
      }
    } else {
      this.disabled = true;
    }
  }
  ngOnInit() {
    console.log(this.options);
    if (!this.range) {
      this.range = {
        value: 5,
        labelMin: null,
        labelMax: null,
      };
    }
    if (!this.options) {
      this.options = [];
    }
  }
  async save() {
    await this.modalController.dismiss({
      question: this.question,
      description: this.description,
      type: this.type,
      range: this.range,
      options: this.options
    });
  }
  close() {
    this.modalController.dismiss();
  }
  addOption() {
    if (this.newOption) {
      this.options.push(this.newOption);
      this.newOption = '';
    }
  }
  removeOption(option) {
    this.options.splice(this.options.indexOf(option), 1);
  }
}
