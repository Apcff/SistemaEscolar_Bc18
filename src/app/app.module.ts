import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./components/login/login.component";
import { CoreModule } from "./core/core.module";
import { interceptors } from "./interceptors/auth.interceptor";
import { MaterialModule } from "./shared/material.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HotToastModule } from '@ngneat/hot-toast';
import { HomeModule } from "./home/home.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AlunosModule } from "./alunos/alunos.module";
import { ProfessoresModule } from "./professores/professores.module";
import { TurmasModule } from "./turmas/turmas.module";
import { HttpClientModule } from "@angular/common/http";
import { NavModule } from "./nav/nav.module";
import { HeaderModule } from "./header/header.module";
import { DashboardModule } from "./dashboard/dashboard.module";


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
  ],

  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    MaterialModule,
    CoreModule,
    BrowserAnimationsModule,
    HotToastModule.forRoot(),
    HomeModule,
    FormsModule,
    ReactiveFormsModule,
    AlunosModule,
    ProfessoresModule,
    TurmasModule,
    HttpClientModule,
    NavModule,
    HeaderModule,
    DashboardModule,


  ],
  providers: [
    interceptors
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }