import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinechartComponent } from './../../components/charts/linechart/linechart.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [LinechartComponent],
  exports: [LinechartComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule

  ]
})
export class ChartModule { }
