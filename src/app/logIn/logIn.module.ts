import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { logInRoutingModule } from './logIn-routing.module';
import { SinInComponent } from './sin-in/sin-in.component';
import { SinUpComponent } from './sin-up/sin-up.component';


@NgModule({
  declarations: [SinInComponent, SinUpComponent],
  imports: [CommonModule, logInRoutingModule],
})
export class logInModule {}
