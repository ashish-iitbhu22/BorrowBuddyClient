import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { AddExpenseComponent } from './add-expense/add-expense.component';
import { ProfileComponent } from './profile/profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FriendsComponent } from './friends/friends.component';


@NgModule({
  declarations: [MainComponent, HomeComponent, AddExpenseComponent, ProfileComponent, FriendsComponent],
  imports: [HttpClientModule, CommonModule,FormsModule,
    ReactiveFormsModule, MainRoutingModule],
})
export class MainModule {}