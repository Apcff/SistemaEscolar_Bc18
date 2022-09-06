import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlunoUpdateComponent } from './aluno-update/aluno-update.component';
import { AlunosComponent } from './alunos.component';




const routes: Routes = [
  { path: '', component: AlunosComponent },
  { path: 'new', component: AlunoUpdateComponent },
  { path: 'edit/:id', component: AlunoUpdateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlunosRoutingModule {}
