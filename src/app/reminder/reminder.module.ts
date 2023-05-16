import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReminderRoutingModule } from './reminder-routing.module';
import { ReminderInfoComponent } from './reminder-info/reminder-info.component';
import { DatePipe } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';

@NgModule({
  declarations: [
    ReminderInfoComponent
  ],
  imports: [
    CommonModule,
    ReminderRoutingModule,
    NzButtonModule,
    NzModalModule
  ],
  exports:[
    ReminderInfoComponent
  ],
  providers: [
    DatePipe
  ]
})
export class ReminderModule { }
