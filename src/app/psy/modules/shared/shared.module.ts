import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from '../../components/toolbar/toolbar.component';
import { SegmentsComponent } from './../../components/segments/segments.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { PopoverPsyComponent } from './../../components/popover-psy/popover-psy.component';

@NgModule({
  declarations: [ToolbarComponent, SegmentsComponent, PopoverPsyComponent],
  exports: [ToolbarComponent, SegmentsComponent, PopoverPsyComponent],
  entryComponents: [PopoverPsyComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule

  ]
})
export class SharedModule { }
