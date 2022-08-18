import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';


const routes: Routes= [
{path: 'login', component: LoginComponent},

]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ]
})
export class AppRoutingModule { }
