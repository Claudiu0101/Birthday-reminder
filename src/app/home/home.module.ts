import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { BirthdayTableComponent } from './birthday-table/birthday-table.component';
import { NzDividerComponent, NzDividerModule } from 'ng-zorro-antd/divider';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { AddBirthdayComponent } from './add-birthday/add-birthday.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { ReactiveFormsModule } from '@angular/forms';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { FormsModule } from '@angular/forms';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { ReminderModule } from "../reminder/reminder.module";
import { DatePipe } from '@angular/common';
import { SearchPipe } from './pipes/search.pipe';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzInputModule } from 'ng-zorro-antd/input';

@NgModule({
    declarations: [

        BirthdayTableComponent,
        AddBirthdayComponent,
        SearchPipe,
        
    ],
    imports: [
        CommonModule,
        HomeRoutingModule,
        NzDividerModule,
        NzTableModule,
        NzDropDownModule,
        NzButtonModule,
        NzFormModule,
        ReactiveFormsModule,
        NzDatePickerModule,
        NzIconModule,
        FormsModule,
        NzPopconfirmModule,
        ReminderModule,
        NzModalModule,
        NzInputModule
    ],
    providers: [
      DatePipe
    ]
})
export class HomeModule { }
