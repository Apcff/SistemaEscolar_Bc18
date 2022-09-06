import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlunoDeleteComponent } from './aluno-delete/aluno-delete.component';
import { AlunosComponent } from './alunos.component';
import { MatTableModule } from '@angular/material/table';
import { AlunoCreateComponent } from './aluno-create/aluno-create.component';
import { AlunosRoutingModule } from './alunos-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material.module';
import { NgxMaskModule } from 'ngx-mask';
import { AlunoUpdateComponent } from './aluno-update/aluno-update.component';
import { AlunoDetailComponent } from './aluno-detail/aluno-detail.component';

@NgModule({
  declarations: [
    AlunoCreateComponent,
    AlunoDeleteComponent,
    AlunosComponent,
    AlunoUpdateComponent,
    AlunoDetailComponent,
  ],
  imports: [
    CommonModule,
    AlunosRoutingModule,
    MatTableModule,
    ReactiveFormsModule,
    MaterialModule,
    FormsModule,
    NgxMaskModule.forRoot()
  

  
 



  ]
})
export class AlunosModule { }
