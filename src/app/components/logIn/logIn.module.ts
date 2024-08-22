import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { logInRoutingModule } from './logIn-routing.module';
import { SinInComponent } from './sin-in/sin-in.component';
import { SinUpComponent } from './sin-up/sin-up.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [SinInComponent, SinUpComponent],
  imports: [
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    logInRoutingModule,
  ],
})
export class logInModule {}
