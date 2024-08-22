import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SinInComponent } from './sin-in/sin-in.component';
import { SinUpComponent } from './sin-up/sin-up.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'signIn',
    pathMatch: 'full',
  },
  {
    path: 'signIn',
    component: SinInComponent,
  },
  {
    path: 'signUp',
    component: SinUpComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class logInRoutingModule { }
