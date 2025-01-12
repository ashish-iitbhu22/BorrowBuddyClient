import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { logInRoutingModule } from './logIn-routing.module';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sgin-up/sign-up.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [SignInComponent, SignUpComponent],
  imports: [
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    logInRoutingModule,
  ],
})
export class logInModule {}
