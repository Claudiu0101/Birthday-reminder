import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BirthdayTableComponent } from './birthday-table/birthday-table.component';
import { AddBirthdayComponent } from './add-birthday/add-birthday.component';
import { UserLoginComponent } from '../user-login/user-login.component';

const routes: Routes = [
  { path: 'home', component:BirthdayTableComponent}, 
  { path: '', component: UserLoginComponent },
  { path: 'add', component: AddBirthdayComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
