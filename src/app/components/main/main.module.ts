import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [MainComponent, HomeComponent],
  imports: [HttpClientModule, CommonModule, MainRoutingModule],
})
export class MainModule {}
