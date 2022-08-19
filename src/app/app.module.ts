import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './components/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import {MatFormFieldModule} from '@angular/material/form-field';
import { NavComponent } from './components/nav/nav.component'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    MatFormFieldModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
