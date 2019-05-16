import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-popover-more',
  templateUrl: './popover-more.component.html',
  styleUrls: ['./popover-more.component.scss'],
})
export class PopoverMoreComponent implements OnInit {

  constructor(
    private popoverController: PopoverController,
  ) { }

  ngOnInit() {}

  dismiss() {
    this.popoverController.dismiss();
  }

}
