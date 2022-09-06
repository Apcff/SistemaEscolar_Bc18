import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { NavComponent } from './nav/nav.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)

  },

  { path: 'login', component: LoginComponent },


  {
    path: 'alunos',
    loadChildren: () => import('./alunos/alunos.module').then((m) => m.AlunosModule),
  },
  {
    path: 'professores',
    loadChildren: () => import('./professores/professores.module').then((m) => m.ProfessoresModule),
    
  },
  {
    path: 'turmas',
    loadChildren: () => import('./turmas/turmas.module').then((m) => m.TurmasModule),
    
  },

  {
    path: 'dashboard',
    component: DashboardComponent,
    loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      
  },
  {
    path: 'nav',
    component: NavComponent,
    loadChildren: () => import('./nav/nav.module').then((m) => m.NavModule),
   
  },
  {
    path: 'header',
    component: HeaderComponent,
    loadChildren: () => import('./header/header.module').then((m) => m.HeaderModule),
   
  },


  // { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
