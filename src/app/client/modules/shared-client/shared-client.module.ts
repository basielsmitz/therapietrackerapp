import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarClientComponent } from '../../components/toolbar-client/toolbar-client.component';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { PopoverMoreComponent } from '../../components/popover-more/popover-more.component';

@NgModule({
  declarations: [ToolbarClientComponent, PopoverMoreComponent],
  exports: [ToolbarClientComponent, PopoverMoreComponent],
  entryComponents: [PopoverMoreComponent],
  imports: [
    FormsModule,
    IonicModule,
    RouterModule,
    CommonModule,
  ]
})
export class SharedClientModule { }
